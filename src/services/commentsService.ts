import { type ICommentCreation } from "@/types/ICommentCreation";
import client from "@/utils/httpClient"

export const getComments = (postId: number) => {
  return client.get('/comments', {
    params: {
      postId,
    },
  });
};

export const createComment = (comment: ICommentCreation) => {
  return client.post('/comments', comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
