import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from './NavBar';
const GalleryContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gridTemplateRows: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '1px',
  position: 'relative',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const GalleryItem = styled(Box)(({ theme, rowSpan, colSpan }) => ({
  gridRow: `span ${rowSpan}`,
  gridColumn: `span ${colSpan}`,
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
}));

// Define a complex set of images with various sizes
const images = [
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723542687/WhatsApp_Image_2024-08-11_at_9.43.44_AM_1_v5xzmr.jpg', alt: 'तस्बिर 1', rowSpan: 2, colSpan: 2 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723542687/WhatsApp_Image_2024-08-11_at_9.43.44_AM_jwv424.jpg', alt: 'तस्बिर 2', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723542687/WhatsApp_Image_2024-08-11_at_9.43.43_AM_dvd4j8.jpg', alt: 'तस्बिर 3', rowSpan: 1, colSpan: 2 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1723542687/WhatsApp_Image_2024-08-11_at_9.43.42_AM_xyj4f3.jpg', alt: 'तस्बिर 4', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315485/WhatsApp_Image_2024-08-21_at_10.12.15_PM_iwbrol.jpg', alt: 'तस्बिर 5', rowSpan: 2, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315486/WhatsApp_Image_2024-08-21_at_10.12.16_PM_1_r9rtdb.jpg', alt: 'तस्बिर 6', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315490/WhatsApp_Image_2024-08-21_at_10.12.18_PM_ndsvxf.jpg', alt: 'तस्बिर 7', rowSpan: 2, colSpan: 2 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315549/WhatsApp_Image_2024-08-21_at_10.12.19_PM_gbyoq8.jpg', alt: 'तस्बिर 8', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315487/WhatsApp_Image_2024-08-21_at_10.12.17_PM_nxwl7r.jpg', alt: 'तस्बिर 9', rowSpan: 1, colSpan: 2 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315551/WhatsApp_Image_2024-08-21_at_10.10.17_PM_qa97e0.jpg', alt: 'तस्बिर 10', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315734/WhatsApp_Image_2024-08-21_at_10.12.15_PM_1_z3dda0.jpg', alt: 'तस्बिर 11', rowSpan: 1, colSpan: 1 },
  { src: 'https://res.cloudinary.com/dzjlrwbfe/image/upload/v1724315828/WhatsApp_Image_2024-08-21_at_10.12.14_PM_s8fzcy.jpg', alt: 'तस्बिर 12', rowSpan: 1, colSpan: 1 },
];

const Gallery = () => {
  return (
    <>
    <NavBar/>
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        ग्यालेरी
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        यहाँ हाम्रो समुदायको प्रमुख घटनाहरू र गतिविधिहरूका तस्बिरहरू छन्।
      </Typography>
      <GalleryContainer>
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            rowSpan={image.rowSpan}
            colSpan={image.colSpan}
          >
            <img src={image.src} alt={image.alt} />
            <Box className="overlay">
              <Typography variant="h6">{image.alt}</Typography>
            </Box>
          </GalleryItem>
        ))}
      </GalleryContainer>
    </Container>
    </>
  );
};

export default Gallery;
