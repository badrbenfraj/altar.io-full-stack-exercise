export * from './keycloak/keycloak.module';
export * from './grid/grid.module';
export * from './payments/payments.module';
import { KeycloakConfigModule, PaymentsModule, GridModule } from './';

export const Modules = [KeycloakConfigModule, PaymentsModule, GridModule];
