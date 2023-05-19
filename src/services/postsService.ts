import client from "@/utils/httpClient"

export const getPosts = (userId: number) => {
  return client.get(`/posts`, {
    params: {
      userId,
    },
  });
};

export const getPostById = (id: number) => {
  return client.get(`/posts/${id}`);
};
