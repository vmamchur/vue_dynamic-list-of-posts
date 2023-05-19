import type { IPostCreation } from "@/types/IPostCreation";
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

export const createPost = (post: IPostCreation) => {
  return client.post('/posts', post);
};

export const deletePost = (id: number) => {
  return client.delete(`/posts/${id}`);
};

export const updatePost = (id: number, post: IPostCreation) => {
  return client.patch(`/posts/${id}`, post);
};
