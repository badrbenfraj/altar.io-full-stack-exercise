import axios from 'axios';
import { countOccurrences } from '@helpers';

describe('GridController (e2e)', () => {
  // ho to make a variable global for all tests

  const baseURL = `/api`;
  it('/grid (GET)', async () => {
    const response = await axios.get(`${baseURL}/grid`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(10);
    for (let i = 0; i < response.data.length; i++) {
      expect(response.data[i].length).toBe(10);
    }
  });
  it('/grid?bias=a (GET)', async () => {
    const bias = 'a';
    const response = await axios.get(`${baseURL}/grid?bias=${bias}`);
    expect(response.status).toBe(200);
    expect(countOccurrences(response.data, bias)).toBe(20);
  });

  it('/grid/code (GET)', async () => {
    const grid = await axios.get(`${baseURL}/grid`);
    const response = await axios.post(`${baseURL}/grid/code`, grid.data);
    expect(response.status).toBe(201);
    expect(response.data?.toString()?.length).toBe(2);
  });
});
