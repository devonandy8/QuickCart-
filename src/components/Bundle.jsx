import React from "react";
import { Box, Flex, Image, Text } from "@mantine/core";
import BuyNow from "./BuyNow";

import jbl from "../../assets/jbl_soundbox_image.png";
import controller from "../../assets/md_controller_image.png";
const Bundle = () => {
  return (
    <Flex
      style={{
        height: "300px",
        width: "90%",
        margin: "auto",
        justifyContent: "center",
        justifyContent: "space-between",
        background: "#E6E9F2",
        borderRadius: "16px",
        alignItems: "center",
        paddingLeft: "40px",
        overflow: "hidden",
      }}
    >
      <Image
        src={jbl}
        style={{
          width: "auto",
          height: "220px",
        }}
      />
      <Flex
        direction={"column"}
        style={{
          width: "300px",
          height: "max-content",
        }}
      >
        <Text
          style={{ fontWeight: "800", fontSize: "30px", textAlign: "center" }}
        >
          Level Up Your Gaming Experience
        </Text>
        <Text
          style={{ color: "#6b7280", fontSize: "13px", textAlign: "center" }}
        >
          From immersive sound to precise controls—everything you need to win
        </Text>
        <BuyNow />
      </Flex>
      <Image
        src={controller}
        style={{
          width: "300px",
          height: "100%",
        }}
      />
    </Flex>
  );
};

export default Bundle;
