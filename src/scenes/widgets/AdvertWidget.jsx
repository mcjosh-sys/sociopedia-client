import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { getMediaUrl } from "src/apiConfig";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Typography color={dark}>Sponsord</Typography>
      <Typography color={medium}>Create Ad</Typography>
      <img
        src={getMediaUrl("info4.jpeg")}
        alt=""
        width={"100%"}
        height={"auto"}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetic.com</Typography>
      </FlexBetween>
      <Typography color={medium} m={"0.5rem 0"}>
        Your pathway to stunning and immaculate beauty and make sure your skin
        is an exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
