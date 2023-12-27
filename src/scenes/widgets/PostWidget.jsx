import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { PropTypes } from "prop-types";
import makeRequest from "../../axios";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComment, setIsComment] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    await makeRequest(token)
      .patch(`/posts/${postId}/like`,{userId:loggedInUserId})
      .then((res) => dispatch(setPost({ post: res.data })));
  };

  return (
    <WidgetWrapper m={"2rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width={"100%"}
          height={"auto"}
          alt={`post-${postId}`}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt={"0.25rem"}>
        <FlexBetween gap={"1rem"}>
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt={"0.5rem"}>
          {comments.map((comment, i) => {
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>;
          })}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

PostWidget.propTypes = {
  postId: PropTypes.string,
  postUserId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string,
  likes: PropTypes.object,
  comments: PropTypes.array,
};

export default PostWidget;