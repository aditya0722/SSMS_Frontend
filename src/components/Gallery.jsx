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
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 1', rowSpan: 2, colSpan: 2 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 2', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 3', rowSpan: 1, colSpan: 2 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 4', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 5', rowSpan: 2, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 6', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 7', rowSpan: 2, colSpan: 2 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 8', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 9', rowSpan: 1, colSpan: 2 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 10', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 11', rowSpan: 1, colSpan: 1 },
  { src: 'https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg', alt: 'तस्बिर 12', rowSpan: 1, colSpan: 1 },
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
