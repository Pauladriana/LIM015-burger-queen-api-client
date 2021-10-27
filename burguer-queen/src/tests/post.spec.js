/* eslint-disable no-undef */
import fetchMock from 'jest-fetch-mock';
import {
  signIn, createData, createUser, createOrder,
} from '../services/post';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});
const token = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE',
};

describe('Post', () => {
  const user = {
    _id: '12345', email: 'some@test.com', password: 'Abc@12345', roles: { admin: true },
  };
  describe('SignIn', () => {
    it('SignIn should been called', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockResponseOnce(JSON.stringify(token));
      await signIn(user, setLoading, setModalMessage);
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/auth');
      expect(fetch.mock.calls[1][0]).toEqual(`https://bq-lab-2021.herokuapp.com/users/${user.email}`);
    });
    it('SignIn should fail', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.post = jest.fn(() => 'fail');
      await signIn('fail', setLoading, setModalMessage);
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/auth');
    });
    it('Redirect to `#/admin/users`', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.once(JSON.stringify(token));
      fetch.once(JSON.stringify(user));
      const response = await signIn(user, setLoading, setModalMessage);
      expect(window.location.hash).toBe('#/admin/users');
      expect(response).toBe(undefined);
    });
    it('Redirect to `#/meserx/neworder`', async () => {
      const waiter = { email: 'some@test.com', password: 'Abc@12345', roles: { admin: false, name: 'mesera' } };
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.once(JSON.stringify(token));
      fetch.once(JSON.stringify(waiter));
      const response = await signIn(waiter, setLoading, setModalMessage);
      expect(window.location.hash).toBe('#/meserx/neworder');
      expect(response).toBe(undefined);
    });
    it('Redirect to `#/chef/pendingorders`', async () => {
      const chef = { email: 'some@test.com', password: 'Abc@12345', roles: { admin: false, name: 'cocinera' } };
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.once(JSON.stringify(token));
      fetch.once(JSON.stringify(chef));
      const response = await signIn(chef, setLoading, setModalMessage);
      expect(window.location.hash).toBe('#/chef/pendingorders');
      expect(response).toBe(undefined);
    });
    it('Should fail when recibe an err with message `Invalid password`', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject({ err: true, message: 'Invalid password' });
      const response = await signIn(user, setLoading, setModalMessage);
      expect(response).toBe(null);
    });
    it('Should fail when recibe an err with message `User doesn\'t exists`', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject({ err: true, message: 'User doesn\'t exists' });
      const response = await signIn(user, setLoading, setModalMessage);
      expect(response).toBe(null);
    });
    it('Should fail when recibe an err`', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject({ err: true });
      const response = await signIn(user, setLoading, setModalMessage);
      expect(response).toBe(null);
    });
  });

  describe('CreateData', () => {
    it('CreateData should been called', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      const product = { _id: '12345' };
      fetch.mockResponseOnce(JSON.stringify(product));
      const response = await createData(user, setLoading, setModalMessage, 'products');
      expect(response).toBe(null);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/products');
    });
    it('CreateData should fail', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockResponseOnce(new Error('fake error message'));
      const response = await createData('', setLoading, setModalMessage, 'products');
      expect(response).toBe(null);
    });
  });

  describe('CreateUser', () => {
    it('CreateUser should been called', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockResponseOnce(JSON.stringify(user));
      const response = await createUser(user, setLoading, setModalMessage, 'users');
      expect(response).toBe(undefined);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/users');
    });
    it('CreateUser should fail', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject({ err: true, message: `User with email: ${user.email} already exists` });
      const response = await createUser(user, setLoading, setModalMessage, 'users');
      expect(response).toBe(undefined);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/users');
    });
    it('CreateUser should fail', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject(new Error('Some error message'));
      const response = await createUser(user, setLoading, setModalMessage, 'users');
      expect(response).toBe(undefined);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/users');
    });
  });

  describe('CreateOrder', () => {
    it('CreateOrder should been called', async () => {
      const order = { _id: '12345' };
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockResponseOnce(JSON.stringify(order));
      await createOrder('test', order, '12345', setLoading, setModalMessage, 'orders');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/orders');
    });
    it('CreateOrder should fail when recibe an error with status 400', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject({ err: true, status: 400 });
      const response = await createOrder('test', {}, '12345', setLoading, setModalMessage, 'orders');
      expect(response).toBe(undefined);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('https://bq-lab-2021.herokuapp.com/orders');
    });
    it('CreateOrder should fail', async () => {
      const setLoading = () => false;
      const setModalMessage = () => null;
      fetch.mockReject(new Error('Some fake error'));
      const response = await createOrder('test', {}, '12345', setLoading, setModalMessage, 'orders');
      expect(response).toBe(undefined);
    });
  });
});
