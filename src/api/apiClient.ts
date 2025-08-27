import { handleUnauthorized } from '../utils/auth';

const apiClient = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    handleUnauthorized();
    return Promise.reject(new Error('Unauthorized'));
  }

  return response;
};

export default apiClient;
