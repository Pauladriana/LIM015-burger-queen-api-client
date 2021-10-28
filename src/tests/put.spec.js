/* eslint-disable no-undef */
import fetchMock from 'jest-fetch-mock';
import { updateUser, updateOrder, updateData } from '../services/put';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('Put Product Data', () => {
  const putResponseProduct = {
    _id: '123456',
    name: 'sandwich de palta',
    price: 'S/9',
    type: 'desayuno',
    img: 'url',
  };
  it('Returns product info updated', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(putResponseProduct));
    const productToEdit = {
      _id: '98765',
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await updateData(productToEdit, setLoading, setModalMessage, 'products', productToEdit._id, token);
    expect(data).toEqual(putResponseProduct);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns product error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const productToEdit = {
      _id: null,
      name: 'sandwich de huevo',
      price: 'S/9',
      type: 'desayuno',
      img: 'url',
    };
    const data = await updateData(productToEdit, setLoading, setModalMessage, 'product5s', productToEdit._id, token);
    expect(data).toEqual(null);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Put User Data', () => {
  const putResponseUser = {
    _id: '67890',
    email: 'waiter@test.com',
    password: 'Abc@12345',
    roles: { admin: false, name: 'mesera' },
  };
  it('Returns user info updated', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(putResponseUser));
    const userToEdit = {
      _id: '12345',
      email: 'some@test.com',
      password: 'Abc@12345',
      roles: { admin: true, name: 'administradora' },
    };
    const data = await updateUser(userToEdit, setLoading, setModalMessage, 'users', userToEdit._id, token);
    expect(data).toEqual(putResponseUser);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns user error', async () => {
    const setLoading = () => false;
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const userToEdit = {
      _id: '12345',
      email: 'some@test.com',
      password: 'Abc@12345',
      roles: { admin: true, name: 'administradora' },
    };
    const data = await updateData(userToEdit, setLoading, setModalMessage, 'usersss', userToEdit._id, token);
    expect(data).toEqual(null);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Put Order Data', () => {
  const putResponseOrder = {
    _id: '123456',
    userId: 'sandwich de palta',
    client: 'S/9',
    products: [{ productId: '1235', qty: 2 }],
    status: 'delivering',
  };
  it('Returns order info updated', async () => {
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockResponseOnce(JSON.stringify(putResponseOrder));
    const orderToEdit = {
      _id: '123456',
      userId: 'sandwich de palta',
      client: 'S/9',
      products: [{ productId: '1235', qty: 2 }],
      status: 'pending',
    };
    const data = await updateOrder('orders', orderToEdit._id, 'delivered', setModalMessage, 'Orden finalizada', token);
    expect(data).toEqual(putResponseOrder);
    expect(fetch).toHaveBeenCalled();
  });
  it('Returns order error', async () => {
    const setModalMessage = () => null;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjc2MmViZDMwMDZjNWYzOWNhYWVmOSIsImlhdCI6MTYzNTA4NjQ3NSwiZXhwIjoxNjM1MTcyODc1fQ.wuEkS7xBY9_wl6aE_r9pV0d9oDJoNMu1J3zNZgBBEvE';
    fetch.mockReject(() => Promise.reject(new Error('Err')));
    const orderToEdit = {
      _id: '123456',
      userId: 'sandwich de palta',
      client: 'S/9',
      products: [{ productId: '1235', qty: 2 }],
      status: 'pending',
    };
    const data = await updateOrder('orrrrders', orderToEdit._id, 'delivered', setModalMessage, 'Orden finalizada', token);
    expect(data).toEqual(undefined);
    expect(fetch).toHaveBeenCalled();
  });
});
