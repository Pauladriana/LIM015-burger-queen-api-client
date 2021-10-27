/* eslint-disable no-undef */
import fetchMock from 'jest-fetch-mock';
import { getData, getUserLogged } from '../services/get';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('Get data', () => {
  const getResponseData = [
    { _id: '12345', email: 'some@test.com', password: 'Abc@12345' },
    { _id: '12345', email: 'some1@test.com', password: 'Abc@12345' },
  ];
  it('Returns array of users', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(getResponseData));
    const _id = '12345';
    const data = await getData('users', token);
    expect(data.length).toBeGreaterThan(0);
    expect(fetch).toHaveBeenCalled();
    return data.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          _id,
        }),
      );
    });
  });
  it('Returns an user', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(getResponseData[0]));
    const data = await getUserLogged(`users/${getResponseData[0].email}`, token);
    expect(data).toEqual(getResponseData[0]);
    expect(fetch).toHaveBeenCalled();
  });
  it('Fail with an error', async () => {
    const err = new Error('Fail');
    fetch.mockReject(() => Promise.reject(err));
    const data = await getUserLogged('users/some@test.com');
    expect(data).toEqual(err);
    expect(fetch).toHaveBeenCalled();
  });
});
