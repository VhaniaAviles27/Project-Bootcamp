import { renderHook, act } from '@testing-library/react';
import { useHandleAuth } from '../useHandleAuth'; 
import {
  showFieldsRequiredAlert,
  showLoginSuccessAlert,
  showInvalidUsernameAlert,
  showInvalidPasswordAlert,
  showNetworkErrorAlert,
} from '../../../utils/validationAlert';

jest.mock('../../../utils/validationAlert', () => ({
  showFieldsRequiredAlert: jest.fn(),
  showLoginSuccessAlert: jest.fn(),
  showInvalidUsernameAlert: jest.fn(),
  showInvalidPasswordAlert: jest.fn(),
  showNetworkErrorAlert: jest.fn(),
}));

global.fetch = jest.fn();

describe('useHandleAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show fields required alert if username or password is empty', async () => {
    const { result } = renderHook(() => useHandleAuth());

    await act(async () => {
      const response = await result.current.handleAuth('', 'password');
      expect(response).toBe(false);
    });

    expect(showFieldsRequiredAlert).toHaveBeenCalled();
  });

  test('should show invalid username alert if username is invalid', async () => {
    const mockFetchResponse = {
      ok: true,
      json: async () => ({ error: 'invalid_username' }),
    };
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    const { result } = renderHook(() => useHandleAuth());

    await act(async () => {
      const response = await result.current.handleAuth('invalidUser', 'password');
      expect(response).toBe(false);
    });

    expect(showInvalidUsernameAlert).toHaveBeenCalled();
  });

  test('should show invalid password alert if password is invalid', async () => {
    const mockFetchResponse = {
      ok: true,
      json: async () => ({ error: 'invalid_password' }),
    };
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    const { result } = renderHook(() => useHandleAuth());

    await act(async () => {
      const response = await result.current.handleAuth('username', 'invalidPass');
      expect(response).toBe(false);
    });

    expect(showInvalidPasswordAlert).toHaveBeenCalled();
  });

  test('should show login success alert and store token if login is successful', async () => {
    const mockFetchResponse = {
      ok: true,
      json: async () => ({ accessToken: 'testToken', username: 'testUser' }),
    };
    (fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse);

    const { result } = renderHook(() => useHandleAuth());

    await act(async () => {
      const response = await result.current.handleAuth('username', 'password');
      expect(response).toBe(true);
    });

    expect(showLoginSuccessAlert).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'testToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ accessToken: 'testToken', username: 'testUser' }));
  });

  test('should show network error alert if network error occurs', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useHandleAuth());

    await act(async () => {
      const response = await result.current.handleAuth('username', 'password');
      expect(response).toBe(false);
    });

    expect(showNetworkErrorAlert).toHaveBeenCalled();
  });
});
