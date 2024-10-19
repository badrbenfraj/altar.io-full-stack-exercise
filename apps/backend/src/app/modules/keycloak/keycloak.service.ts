import { KEYCLOAK_HOST, KEYCLOAK_PORT } from '@helpers/constants';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakService {
  extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      return authHeader.split(' ')[1]; // Assumes Bearer token format
    }
    return null;
  }

  async validateToken(token: string): Promise<boolean> {
    const keycloakUrl = `http://${KEYCLOAK_HOST}:${KEYCLOAK_PORT}`;
    const realm = 'master';
    const clientId = 'admin-cli';

    try {
      if (!token) {
        console.error('Token not provided');
        return false;
      }
      const decodedToken = jwt.decode(token, { complete: true });

      const publicKeyResponse = await axios.get(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`);
      const signingKey = publicKeyResponse.data.keys.find((key) => key.use === 'sig' && key.alg === 'RS256');

      if (!signingKey) {
        return false; // Signing key not found
      }

      const pemStart = '-----BEGIN CERTIFICATE-----\n';
      const pemEnd = '\n-----END CERTIFICATE-----';
      const pem = pemStart + signingKey.x5c[0] + pemEnd;

      if (decodedToken.payload.iss !== `${keycloakUrl}/realms/${realm}`) {
        return false; // Invalid issuer
      }

      if (decodedToken.payload.azp !== clientId) {
        return false; // Invalid audience
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.payload.exp < currentTime) {
        return false; // Token expired
      }

      jwt.verify(token, pem, { algorithms: ['RS256'] });
      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      return false; // Error in validating token
    }
  }
}
