import React from "react";
import { Card, Text, Box, Grid, GridCol } from "@mantine/core";
import FeaturedCard from "./FeatureCard";
import Unpar from "../../assets/girl_with_headphone_image.png";
import Strong from "../../assets/girl_with_earphone_image.png";
import Power from "../../assets/boy_with_laptop_image.png";

const Featured = () => {
  const products = [
    {
      id: 1,
      name: "Unparralled Sound",
      description: "Experience crystal-clear audio with premium headphones.",
      image: Unpar,
    },
    {
      id: 2,
      name: "Stay Connected",
      description: "Shop the latest laptops for work, gaming, and more.",
      image: Strong,
    },
    {
      id: 3,
      name: "Power in every Pixel",
      description:
        "Unparalled SoundCompact and stylish earphones for every occasion.",
      image: Power,
    },
  ];
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Featured Products
      </Text>{" "}
      <div
        style={{
          width: "13rem",
          height: "4px",
          background: "#ea580c",
          marginTop: "8px",
          marginBottom: "30px",
          borderRadius: "2px",
        }}
      />
      <Grid gutter={{ xs: "md", md: "xl", xl: 50 }}>
        {products.map((product) => (
          <Grid.Col style={{}} span={{ md: 4, sm: 6, xs: 12 }}>
            <FeaturedCard key={product.id} product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Featured;
