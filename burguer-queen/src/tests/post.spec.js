/* eslint-disable no-undef */
import fetcMock from 'jest-fetch-mock';
import {
  signIn, createData, createUser, createOrder,
} from '../services/post';

fetcMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('Post', () => {
  const user = { email: 'some@test.com', password: 'Abc@12345' };
  it('Returns a token', async () => {
    const token = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE',
    };
    fetch.mockResponseOnce(JSON.stringify(token));
    // const data = await signIn(user);
    // console.log(data);
    // expect(fetch).toHaveBeenCalled();
    // return data.forEach((user) => {
    //   expect(user).toEqual(
    //     expect.objectContaining({
    //       _id,
    //     }),
    //   );
    // });
  });
});
