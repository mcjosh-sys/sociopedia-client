import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { getMediaUrl } from "src/apiConfig";

const UserImage = ({ image, name, size = "60px" }) => {
  const userImageUrl = getMediaUrl(image)
  const initials = () => {
    const nameArr = name.split(" ");
    return `${nameArr[0][0]}${nameArr[1][0]}`;
  };
  const generateRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };
  return (
    <Box width={size} height={size}>
      {image ? (
        <img
          src={userImageUrl}
          alt="user"
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
        />
      ) : (
        <Box
          sx={{ backgroundColor: generateRandomHexColor() }}
          borderRadius={"50%"}
          width={size}
          height={size}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2">{initials()}</Typography>
        </Box>
      )}
    </Box>
  );
};

UserImage.propTypes = {
  image: PropTypes.any,
  name: PropTypes.string,
  size: PropTypes.string,
};

export default UserImage;
