import React from 'react';
import { CheckCircle, CameraAlt, AttachMoney, Group } from '@mui/icons-material';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';

const features = [
  { icon: <CheckCircle color="primary" />, text: "वास्तविक समय सहयोग" },
  { icon: <CameraAlt color="primary" />, text: "दूरस्थ क्यामेरा पहुँच" },
  { icon: <AttachMoney color="primary" />, text: "वित्तीय व्यवस्थापन" },
  { icon: <Group color="primary" />, text: "प्रयोगकर्ता-अनुकूल इन्टरफेस" },
];

const testimonials = [
  {
    image: 'https://via.placeholder.com/100', 
    name: 'राम शर्मा', 
    text: "उत्कृष्ट समुदाय र सहयोग! अत्यधिक सिफारिस गरिन्छ!", 
    role: 'अध्यक्ष'
  },
  {
    image: 'https://via.placeholder.com/100', 
    name: 'सीता देवी', 
    text: "यस एपले हाम्रो काम गर्ने तरिका परिवर्तन गरेको छ!", 
    role: 'सचिव'
  },
  {
    image: 'https://via.placeholder.com/100', 
    name: 'गोपाल सिंह', 
    text: "प्रयोगकर्ता-अनुकूल र धेरै भरपर्दो।", 
    role: 'सदस्य'
  },
];

const Main = () => {
  return (
    <>
      <Box sx={{ py: 8, backgroundColor: 'whiteSmoke', color: 'black' }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'secondary.main' }}>
                मुख्य विशेषताहरू
              </Typography>
              <Box>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2 }}>{feature.icon}</Box>
                    <Typography>{feature.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'secondary.main' }}>
                प्रशंसापत्र
              </Typography>
              <Box>
                {testimonials.map((testimonial, index) => (
                  <Paper key={index} sx={{ p: 3, mb: 2, backgroundColor: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={testimonial.image} alt={testimonial.name} sx={{ mr: 2, width: 56, height: 56 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 'bold', color: 'secondary.main' }}>{testimonial.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'black' }}>{testimonial.role}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'black' }}>"{testimonial.text}"</Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Main;
