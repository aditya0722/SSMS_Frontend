import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const ProgressBar = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 9999 }}>
      {loading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'skyblue',
              height:"2px",
            },
          }}
        />
      )}
    </Box>
  );
};

export default ProgressBar;
