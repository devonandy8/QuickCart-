import React from "react";
import { Box, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

const BuyNow = () => {
  return (
    <Button
      style={{
        width: "120px",
        padding: "0",
        margin: "10px auto",
        background: "#ea580c",
      }}
    >
      Buy Now <IconArrowRight />
    </Button>
  );
};

export default BuyNow;
