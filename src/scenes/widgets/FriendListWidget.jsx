import { Box, Typography, useTheme } from "@mui/material";
import makeRequest from "../../axios";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { PropTypes } from "prop-types";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const getFriends = () => {
    makeRequest(token)(`/users/${userId}/friends`).then((res) =>
      dispatch(setFriends(res.data))
    );
  };

  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={"500"}
        sx={{ md: "1.5rem" }}
      >
        Frind List
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

FriendListWidget.propTypes = {
    userId: PropTypes.string,
}

export default FriendListWidget;
