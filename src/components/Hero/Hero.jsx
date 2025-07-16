import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Group,
  Image as MantineImage,
} from "@mantine/core";
import slide1 from "../../../assets/header_headphone_image.png";
import slide2 from "../../../assets/header_playstation_image.png";
import slide3 from "../../../assets/header_macbook_image.png";
import arrow_icon from "../../../assets/arrow_icon.svg";

const sliderData = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: slide1,
  },
  {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    offer: "Hurry up only few lefts!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: slide2,
  },
  {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: slide3,
  },
];

const dotActiveStyle = { background: "#ea580c" };
const dotInactiveStyle = { background: "#6b7280" };

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [hovered]);
  const handleSlideChange = (index) => setCurrentSlide(index);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Flex
        style={{
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <Flex
              key={slide.id}
              direction={{ base: "column-reverse", md: "row" }}
              align="center"
              justify="space-between"
              style={{
                background: "#E6E9F2",
                padding: "2rem 1.25rem",
                paddingLeft: "4rem",
                marginTop: "1.5rem",
                borderRadius: "0.75rem",
                minWidth: "100%",
                boxSizing: "border-box",
                opacity: isActive ? 1 : 0,
                transition:
                  "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <Box
                style={{
                  paddingLeft: "0",
                  marginTop: "2.5rem",
                  maxWidth: "32rem",
                }}
              >
                <Box
                  style={{
                    color: "#ea580c",
                    paddingBottom: "0.25rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {slide.offer}
                </Box>
                <Text
                  style={{
                    maxWidth: "32rem",
                    fontSize: "2.5rem",
                    lineHeight: "3rem",
                    fontWeight: 750,
                    color: "#1e293b",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slide.title}
                </Text>
                <Group spacing={16} style={{ marginTop: 24 }}>
                  <Button
                    style={{
                      padding: "0.625rem 2.5rem",
                      background: "#ea580c",
                      borderRadius: "9999px",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                    radius="xl"
                    size="md"
                  >
                    {slide.buttonText1}
                  </Button>
                  <Button
                    variant="subtle"
                    radius="xl"
                    size="md"
                    component="span"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 1.5rem",
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#1e293b",
                      background: "transparent",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        padding: "0 5px",
                      }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "translateX(0.25rem)";
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "translateX(0)";
                      }}
                    >
                      {slide.buttonText2}
                      <img
                        src={arrow_icon}
                        alt="arrow_icon"
                        style={{
                          transition: "transform 0.2s",
                          width: "1.25rem",
                          height: "1.25rem",
                          display: "inline-block",
                        }}
                      />
                    </span>
                  </Button>
                </Group>
              </Box>

              <Flex
                align="center"
                justify="center"
                style={{ flex: 1, minWidth: 0 }}
              >
                <MantineImage
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  width={288}
                  height={288}
                  style={{ width: "18rem", maxWidth: "100%", height: "auto" }}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      <Group position="center" spacing={8} style={{ marginTop: 32 }}>
        {sliderData.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleSlideChange(index)}
            style={{
              height: "0.5rem",
              width: "0.5rem",
              borderRadius: "9999px",
              cursor: "pointer",
              ...(currentSlide === index ? dotActiveStyle : dotInactiveStyle),
              transition: "background 0.2s",
            }}
          />
        ))}
      </Group>
    </Box>
  );
};

export default HeaderSlider;
