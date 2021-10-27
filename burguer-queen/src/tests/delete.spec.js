/* eslint-disable no-undef */
import fetchMock from 'jest-fetch-mock';
import { deleteData } from '../services/delete';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('Delete product', () => {
  const myProduct = {
    _id: '98765',
    name: 'sandwich de huevo',
    price: 'S/9',
    type: 'desayuno',
    img: 'url',
  };
  it('Deletes a product', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(myProduct));
    const productToDelete = {
      _id: '98765',
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await deleteData(setLoading, setModalMessage, '/products', productToDelete._id, '/admin', token);
    expect(data).toEqual(myProduct);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns delete product error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const productToDelete = {
      _id: '98765',
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await deleteData(setLoading, setModalMessage, '/productssss', productToDelete._id, '/admin', token);
    expect(data).toEqual(undefined);
    expect(fetch).toHaveBeenCalled();
  });
});
describe('Delete product', () => {
  const myProduct = {
    _id: '98765',
    name: 'sandwich de huevo',
    price: 'S/9',
    type: 'desayuno',
    img: 'url',
  };
  it('Deletes a product', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(myProduct));
    const productToDelete = {
      _id: '98765',
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await deleteData(setLoading, setModalMessage, '/products', productToDelete._id, '/admin', token);
    expect(data).toEqual(myProduct);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns delete product error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const productToDelete = {
      _id: '98765',
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await deleteData(setLoading, setModalMessage, '/productssss', productToDelete._id, '/admin', token);
    expect(data).toEqual(undefined);
    expect(fetch).toHaveBeenCalled();
  });
});
describe('Delete user', () => {
  const myUser = {
    _id: '67890',
    email: 'waiter@test.com',
    password: 'Abc@12345',
    roles: { admin: false, name: 'mesera' },
  };
  it('Deletes an user', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(myUser));
    const userToDelete = {
      _id: '67890',
      email: 'waiter@test.com',
      password: 'Abc@12345',
      roles: { admin: false, name: 'mesera' },
    };
    const data = await deleteData(setLoading, setModalMessage, '/users', userToDelete._id, '/admin', token);
    expect(data).toEqual(myUser);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns delete user error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const userToDelete = {
      _id: '67890',
      email: 'waiter@test.com',
      password: 'Abc@12345',
      roles: { admin: false, name: 'mesera' },
    };
    const data = await deleteData(setLoading, setModalMessage, '/userrrrrs', userToDelete._id, '/admin', token);
    expect(data).toEqual(undefined);
    expect(fetch).toHaveBeenCalled();
  });
});
describe('Delete order', () => {
  const myOrder = {
    _id: '123456',
    userId: 'sandwich de palta',
    client: 'S/9',
    products: [{ productId: '1235', qty: 2 }],
    status: 'delivering',
  };
  it('Deletes an order', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(myOrder));
    const orderToDelete = {
      _id: '123456',
      userId: 'sandwich de palta',
      client: 'S/9',
      products: [{ productId: '1235', qty: 2 }],
      status: 'delivering',
    };
    const data = await deleteData(setLoading, setModalMessage, '/orders', orderToDelete._id, '/admin', token);
    expect(data).toEqual(myOrder);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns delete order error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const orderToDelete = {
      _id: '123456',
      userId: 'sandwich de palta',
      client: 'S/9',
      products: [{ productId: '1235', qty: 2 }],
      status: 'delivering',
    };
    const data = await deleteData(setLoading, setModalMessage, '/orrders', orderToDelete._id, '/admin', token);
    expect(data).toEqual(undefined);
    expect(fetch).toHaveBeenCalled();
  });
});
