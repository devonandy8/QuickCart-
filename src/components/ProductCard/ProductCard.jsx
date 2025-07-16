import React from "react";
import {
  Image as MantineImage,
  Box,
  Text,
  Button,
  Group,
  Rating,
} from "@mantine/core";
import { Link } from "react-router-dom";
import heart_icon from "../../../assets/heart_icon.svg"; // Adjust the path as necessary

const ProductCard = ({ product }) => {
  const imageUrl =
    product.images?.edges?.[0]?.node?.url ||
    product.image?.[0] ||
    "https://via.placeholder.com/150";

  const isMobile = window.innerWidth < 640;

  return (
    <Link
      to={`/ProductDetail/${product.id}`}
      state={{ product }} // ✅ Pass product object via state
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          width: 200,
          cursor: "pointer",
        }}
      >
        <Box
          style={{
            position: "relative",
            background: "rgba(107,114,128,0.1)",
            borderRadius: "8px",
            width: "100%",
            height: "208px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <MantineImage
            src={imageUrl}
            alt={product.name}
            style={{
              transition: "transform 0.2s",
              objectFit: "cover",
              width: "80%",
              height: "80%",
            }}
            width={800}
            height={800}
          />
          <Button
            variant="white"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#fff",
              padding: 8,
              borderRadius: "9999px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "none",
              cursor: "pointer",
              minWidth: 0,
              height: 32,
              width: 32,
            }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={heart_icon}
              alt="heart_icon"
              style={{ height: 12, width: 12 }}
            />
          </Button>
        </Box>

        <Text
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Text>

        {!isMobile && (
          <Text
            style={{
              fontSize: "0.75rem",
              color: "rgba(107,114,128,0.7)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description}
          </Text>
        )}

        <Group gap={8} align="center">
          <Text style={{ fontSize: "0.75rem", margin: 0 }}>{4.5}</Text>
          <Rating fractions={2} defaultValue={2} size="12px" color="red" />
        </Group>

        <Group align="end" justify="space-between" style={{ width: "100%" }}>
          <Text style={{ fontSize: "1rem", fontWeight: 500 }}>
            ${product.variants.edges[0].node.price.amount}
          </Text>
          {!isMobile && (
            <Button
              variant="outline"
              radius="xl"
              size="xs"
              style={{ padding: "6px 16px" }}
            >
              Buy now
            </Button>
          )}
        </Group>
      </Box>
    </Link>
  );
};

export default ProductCard;
