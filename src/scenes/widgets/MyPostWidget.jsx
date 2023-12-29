import { PropTypes } from "prop-types";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import makeRequest from "../../axios";
import { getPostUrl } from "src/apiConfig";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, firstName, lastName } = useSelector((state) => state.user);
  const name = `${firstName} ${lastName}`
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.mediumMain;
  const medium = palette.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) formData.append("picture", image);
    await makeRequest(token)
      .post(getPostUrl(), formData)
      .then((res) => dispatch(setPosts(res.data)));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap={"1.5rem"}>
        <UserImage name={name} image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            mt: "1rem",
            p: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius={"5px"}
          mt={"1rem"}
          p={"1rem"}
        >
          <Dropzone
            acceptedFiles={".jpg,.jpeg,.png"}
            multiple={false}
                      onDrop={(acceptedFiles) => {
                          setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p={"1rem"}
                  width={"100%"}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p fontStyle={"italic"}>Add image here...</p>
                  ) : (
                    <FlexBetween justifyContent={"space-between"}>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween justifyContent={"space-between"}>
        <FlexBetween gap={"0.25rem"} onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap={"0.25rem"}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}> Clips</Typography>
            </FlexBetween>

            <FlexBetween gap={"0.25rem"}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}> Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap={"0.25rem"}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}> Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap={"0.25rem"}>
            <MoreHorizOutlined sx={{ color: medium }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

MyPostWidget.propTypes = {
  picturePath: PropTypes.string,
};

export default MyPostWidget;
