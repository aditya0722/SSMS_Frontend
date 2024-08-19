import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button, Box, Typography,Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate=useNavigate()
  const items = [
    {
      img: "https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723542687/WhatsApp_Image_2024-08-11_at_9.43.43_AM_dvd4j8.jpg",
      alt: "Hero Image 1",
    },
    {
      img: "https://images.unsplash.com/photo-1699638664757-89ed1dbec8da?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Hero Image 2",
    },
    {
      img: "https://images.unsplash.com/photo-1655337690905-35783231d738?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Hero Image 3",
    },
  ];
const handleClick =()=>{
  navigate("/contact")
}
  return (
    <Container
      sx={{
        position: "relative",
        height: "90vh",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Background Image Slider */}
      <Carousel
        animation="fade"
        autoPlay
        navButtonsAlwaysVisible
        indicators={false}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          "& .MuiButtonBase-root": {
            color: "white",
          },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            component="img"
            src={item.img}
            alt={item.alt}
            sx={{
              width: "100%",
              height: "90vh",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
        ))}
      </Carousel>

      {/* Text and Button */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          padding: { xs: 2, md: 4 },
          marginLeft: { xs: 2, md: 4 },
          maxWidth: { xs: "90%", md: "40%" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "lightblue",
          }}
        >
          सामसिङ सावली मानव संस्कार समिति
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          स्वागत छ सामसिङ सावली मानव संस्कार समितिमा। हामी तपाईलाई हाम्रो परिवारमा सामेल हुन निमन्त्रणा गर्दछौं।
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "lightblue",
            color: "purple",
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          size="large"
          onClick={handleClick}
        >
          आजै सामेल हुनुहोस्
        </Button>
      </Box>
    </Container>
  );
};

export default HeroSection;
