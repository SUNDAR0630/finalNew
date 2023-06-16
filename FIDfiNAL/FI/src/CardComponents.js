// import React from 'react';
// import './Card.css';

// const CardComponent = (props) => {
//   return <div className="card">{props.children}</div>;
// };

// export default CardComponent;



import React from 'react';
import { Grid } from '@mui/material';
import './Card.css';

const CardComponent = (props) => {
  return (
    <Grid container className="card-container">
      <Grid item xs={12} className="card">
        {props.children}
      </Grid>
    </Grid>
  );
};

export default CardComponent;


// import React from 'react';
// import { Grid } from '@mui/material';
// import './Card.css';

// const CardComponent = (props) => {
//   return (
//     <Grid container className="card-container" justifyContent="center">
//       <Grid item xs={12} sm={10} md={8} lg={6} xl={4} className="card">
//         {props.children}
//       </Grid>
//     </Grid>
//   );
// };

// export default CardComponent;
