
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const COLORS = ['red', 'blue', 'green']; 

function LinearProgressWithLabel(props) {
  const { value, color } = props;
  const reversedValue = 100 - value; 

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={reversedValue}
          sx={{ backgroundColor: color, transform: 'scaleX(-1)' }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress1, setProgress1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const [progress3, setProgress3] = React.useState(0);
  const colors = COLORS; 

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress1((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      setProgress2((prevProgress) => (prevProgress >= 100 ? 30 : prevProgress + 10));
      setProgress3((prevProgress) => (prevProgress >= 100 ? 70 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '20%' }}>
      <LinearProgressWithLabel value={10} color={colors[0]} />
      <LinearProgressWithLabel value={100} color={colors[1]} />
      <LinearProgressWithLabel value={80} color={colors[2]} />
    </Box>
  );
}

