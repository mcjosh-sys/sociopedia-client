import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setPost } from "state";
import PostWidget from "./PostWidget";
import { PropTypes } from "prop-types";
import makeRequest from "../../axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    await makeRequest(token)("/posts").then((res) =>
      dispatch(setPosts({ posts: res.data }))
    );
  };
  const getUserPosts = async () => {
    await makeRequest(token)(`/posts/${userId}`).then((res) =>
      dispatch(setPost({ posts: res.data }))
    );
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!posts) return null;

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId = {_id}
            postUserId={userId}
            name = {`${firstName} ${lastName}`}
            description = {description}
            location = {location}
            picturePath = {picturePath}
            userPicturePath = {userPicturePath}
            likes = {likes}
            comments = {comments}
          />
        )
      )}
    </>
  );
};

PostsWidget.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.any,
};

export default PostsWidget;
