import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

const BuyNow = () => {
  return (
    <Button
      component={Link}
      to="/products?category=Accessories"
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
