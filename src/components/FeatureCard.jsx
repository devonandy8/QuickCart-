import React from "react";
import { Box, Text } from "@mantine/core";

const FeatureCard = ({ product }) => {
  return (
    <Box
      style={{
        minHeight: "380px",
        width: "300px",
        position: "relative",
        backgroundImage: `url(${product.image})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // margin: "0 60px",
      }}
    >
      {/* <img
        src={product.image}
        alt={product.name}
        style={{
          objectFit: "contain",
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      /> */}
      <Box
        style={{
          position: "absolute",
          bottom: "20%",
          left: "12%",
          maxWidth: "210px",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: "22px", color: "white" }}>
          {product.name}
        </Text>
        <Text style={{ color: "white" }}>{product.description}</Text>
      </Box>
    </Box>
  );
};

export default FeatureCard;
