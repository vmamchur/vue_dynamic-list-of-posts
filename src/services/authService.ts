import client from "@/utils/httpClient";

export const register = (email: string, name: string) => {
  return client.post('/users', {
    email,
    name,
  });
};

export const login = (email: string) => {
  return client.get(`/users`, {
    params: {
      email,
    },
  });
};
