// import React from 'react';

// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import ReviewsProvider from './Re';

// const ReviewsBar = (props) => {
//   const { score } = props;


//   const calcColor = (percent, start, end) => {
//     let a = percent / 100,
//       b = (end - start) * a,
//       c = b + start;

  
//     return 'hsl(' + c + ', 100%, 50%)';
//   };

//   return (
//     <ReviewsProvider valueStart={10} valueEnd={score}>
//       {(value) => (
//         <CircularProgressbar
//           value={value}
//           text={`${value} %`}
//           circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
//           styles={{
//             trail: {
//               strokeLinecap: 'butt',
//               transform: 'rotate(-126deg)',
//               transformOrigin: 'center center',
//             },
//             path: {
//               strokeLinecap: 'butt',
//               transform: 'rotate(-126deg)',
//               transformOrigin: 'center center',
//               stroke: calcColor(value, 0, 120),
//             },
//             text: {
//               fill: '#ddd',
//             },
//           }}
//           strokeWidth={10}
//         />
//       )}
//     </ReviewsProvider>
//   );
// };

// export default ReviewsBar;

// import React, { useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const ReviewsBar = () => {
//   const [value, setValue] = useState(100);

//   const calcColor = (percent, start, end) => {
//     const a = percent / 100;
//     const b = (end - start) * a;
//     const c = b + start;

//     return `hsl(${c}, 100%, 50%)`;
//   };

//   const handleChangeValue = () => {
//     const randomValue = Math.floor(Math.random() * 101); // Generate a random value between 0 and 100
//     setValue(randomValue);
//   };

//   return (
//     <div style={{ width: '100px' }}>
//       <CircularProgressbar
//         value={value}
//         text={`${value}%`}
//         strokeWidth={5}
//         styles={{
//           root: { width: '50px', height: '100px' },
//           trail: {
//             stroke: '#f4f4f4',
//             strokeLinecap: 'round',
//           },
//           path: {
//             stroke: calcColor(value, 0, 120),
//             strokeLinecap: 'round',
//             transform: 'rotate(90deg)', // Rotate the semicircle by 90 degrees
//             transformOrigin: 'center center',
//             transition: 'stroke-dashoffset 0.5s ease 0s',
//           },
//           text: {
//             fill: '#888',
//             fontSize: '12px',
//             transform: 'rotate(-90deg)', // Rotate the text by -90 degrees to align properly
//             transformOrigin: 'center center',
//           },
//           background: {
//             fill: '#ddd',
//           },
//         }}
//       />
//       <button onClick={handleChangeValue}>Change Value</button>
//     </div>
//   );
// };

// export default ReviewsBar;

// import React, { useState } from 'react';
// import GaugeChart from 'react-gauge-chart';

// const Speedometer = () => {
//   const [value, setValue] = useState(10);

//   const handleChangeValue = () => {
//     const randomValue = Math.floor(Math.random() * 101); // Generate a random value between 0 and 100
//     setValue(randomValue);
//   };

//   return (
//     <div style={{ width: '200px', height: '100px' }}>
//       <GaugeChart
//         id="speedometer-gauge"
//         nrOfLevels={20}
//         arcsLength={[0.2, 0.6, 0.2]}
//         colors={['#FF5F6D', '#FFC371', '#00C49F']}
//         percent={value / 100}
//         needleColor="#333"
//         textColor="#333"
//         needleBaseColor="#333"
//       />
//       <button onClick={handleChangeValue}>Change Value</button>
//     </div>
//   );
// };

// export default Speedometer;


// import React, { useState, useEffect } from 'react';
// import './App.css';

// const Speedometer = ({ min, max }) => {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     const randomValue = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random value within the range
//     setValue(randomValue);
//   }, [min, max]);

//   return (
//     <div className="speedometer-container">
//       <div className="speedometer">
//         <div
//           className="speedometer-value"
//           style={{
//             transform: `rotate(${((value - min) / (max - min)) * 180}deg)`,
//             animation: `fillSpeedometer ${(value - min) * 0.5}s linear forwards`,
//           }}
//         />
//       </div>
//       <div className="speedometer-labels">
//         <span>{100}</span>
//         <span>{max}</span>
//       </div>
//     </div>
//   );
// };

// export default Speedometer;
// import React, { useState, useEffect } from 'react';

// function ProgressBar(props) {
//   const [maxWidth, setMaxWidth] = useState(0);
//   const targetPercentage = props.value / props.maxValue;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMaxWidth(`${targetPercentage * 100}%`);
//     }, 10);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [targetPercentage]);

//   const progressBarStyle = {
//     backgroundImage: `linear-gradient(${props.rotation}deg, ${props.color}, ${props.color2})`,
//     maxWidth: maxWidth,
//     backgroundColor: props.color,
//     borderRadius: getRadius()
//   };

//   function getRadius() {
//     return `5px ${targetPercentage * 100 >= 100 ? '5px 5px' : '0 0'} 5px`;
//   }

//   return (
//     <div className="progress-bar-wrapper">
//       <div className="progress-bar">
//         <div className="progress-bar-progress" style={progressBarStyle}>
//           <div className="percentage">
//             {Math.round(targetPercentage * 100)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProgressBar;
