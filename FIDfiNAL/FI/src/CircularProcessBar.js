
// import React from 'react';
// import './CircularProcess.css';

// const CircularProgressBar = ({ percentage }) => {
//   const getColor = () => {
//     if (percentage >= 75) {
//       return 'green'; 
//     } else if (percentage >= 50) {
//       return 'yellow'; 
//     } else if (percentage >= 25) {
//       return 'orange'; 
//     } else {
//       return 'red';  
//     }
//   };

//   const progressStyle = {
//     stroke: getColor()
//   };

//   return (
//     <svg className="circular-progress" viewBox="0 0 100 100">
//       <circle className="background" cx="50" cy="50" r="45" />
//       <circle className="progress" cx="50" cy="50" r="45" style={progressStyle} />
//       <text className="percentage" x="50" y="50">{percentage}%</text>
//     </svg>
//   );
// };

// export default CircularProgressBar;

// import React from 'react';
// import './CircularProcess.css';

// const CircularProgressBar = ({ percentage }) => {
//   const getProgressValue = (percentage) => {
//     return Math.min(Math.max(percentage, 0), 100); // Limit the percentage value between 0 and 100
//   };

//   const calculateRotation = (percentage) => {
//     const progress = getProgressValue(percentage);
//     const rotation = (progress / 100) * 180; // Calculate the rotation in degrees

//     return rotation;
//   };

//   const progressStyle = {
//     transform: `rotate(${calculateRotation(percentage)}deg)`
//   };

//   return (
//     <svg className="circular-progress" viewBox="0 0 100 100">
//       <circle className="background" cx="50" cy="50" r="45" />
//       <circle className="progress" cx="50" cy="50" r="45" style={progressStyle} />
//       <text className="percentage" x="50" y="50">{percentage}%</text>
//     </svg>
//   );
// };

// export default CircularProgressBar;

import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};
export default function CircularStatic() {
  const [progress, setProgress] = React.useState(99);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={90} />;
}