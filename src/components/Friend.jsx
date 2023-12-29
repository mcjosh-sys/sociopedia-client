import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import makeRequest from "src/axios";
import { getPatchFriendUrl } from "src/apiConfig";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isLoggedInUser = _id === friendId

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.primary.main;
  const medium = palette.primary.medium;

  const isFriend = Boolean(friends?.find((friend) => friend._id === friendId));
  const patchFriend = async () => {
    await makeRequest(token)
      .patch(getPatchFriendUrl({userId: _id, friendId}))
      .then((res) => dispatch(setFriends({ friends: res.data })));
  };

    return (
      <FlexBetween justifyContent={"space-between"}>
        <FlexBetween gap={"1rem"}>
          <UserImage image={userPicturePath} name={name} size="55px" />
          <Box onClick={() => navigate(`/profile/${friendId}`)}>
            <Typography
              color={main}
              variant="h5"
              fontWeight={"500"}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize={"0.75rem"}>
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        {!isLoggedInUser && <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
          }}
        > 
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>}
      </FlexBetween>
    );
};

Friend.propTypes = {
  friendId: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  userPicturePath: PropTypes.string,
};

export default Friend;
