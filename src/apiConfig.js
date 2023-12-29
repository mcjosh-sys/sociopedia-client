//const baseUrl = "https://sociopedia-server-mu.vercel.app";

const api = {
  baseUrl: "https://sociopedia-5wjc.onrender.com",
  endpoints: {
    getRegister: () => `/api/auth/register`,
    getLogin: () => `/api/auth/login`,
    getUser: (userId) => `/api/users/${userId}`,
    patchFriend: ({ userId, friendId }) => `/api/users/${userId}/${friendId}`,
    getFriends: (userId) => `/api/users/${userId}/friends`,
    getPosts: () => `/api/posts`,
    getUserPosts: (userId) => `/api/posts/${userId}`,
    patchLike: (postId) => `/api/posts/${postId}/like`,
    getMedia: (mediaName) => `/media/${mediaName}`,
  },
  constructUrl: (endpoint) => `${api.baseUrl}${endpoint}`,
};

export const getLoginUrl = () => `${api.baseUrl}${api.endpoints.getLogin()}`;
export const getRegisterUrl = () =>
  `${api.baseUrl}${api.endpoints.getRegister()}`;
export const getUserUrl = (userId) =>
  `${api.baseUrl}${api.endpoints.getUser(userId)}`;
export const getPatchFriendUrl = ({ userId, friendId }) =>
  `${api.baseUrl}${api.endpoints.patchFriend({ userId, friendId })}`;
export const getFriendsUrl = (userId) =>
  `${api.baseUrl}${api.endpoints.getFriends(userId)}`;
export const getPostUrl = () => `${api.baseUrl}${api.endpoints.getPosts()}`;
export const getUserPostsUrl = (userId) =>
  `${api.baseUrl}${api.endpoints.getUserPosts(userId)}`;
export const getMediaUrl = (mediaName) =>
  `${api.baseUrl}${api.endpoints.getMedia(mediaName)}`;
export const getPatchLikeUrl = (postId) =>
  `${api.baseUrl}${api.endpoints.patchLike(postId)}`;

export default api;
