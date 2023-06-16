
// import React from 'react';
// import { CircularProgress, Grid } from '@mui/material';
// import './ModifyEnquiry.css';
// import CardComponent from './CardComponents';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import { FaPhone } from 'react-icons/fa';
// import CircularProgressBar from './CircularProcessBar';
// import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
// import CircularStatic from './CircularProcessBar';

// const ModifyEnquiry = (props) => {
//   const {
//     EnquiryNumber,
//     CustomerId,
//     ContractType,
//     AssetClass,
//     MainApplicantName,
//     Location,
//     EnquirtyDate,
//     onPressMobileNumberClick,
//     Loan_Amount,
//     overAll_percenrtage,
//     mobile_no,
//     Status,
//   } = props;

//   function numberWithCommas(x) {
//     const formattedValue = x?.toString().split('.')[0].length > 3
//       ? x?.toString().substring(0, x?.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
//         ',' +
//         x?.toString().substring(x?.toString().split('.')[0].length - 3)
//       : x?.toString();
//     return 'Rs. ' + formattedValue;
//   }

//   const formatAmount = numberWithCommas(Loan_Amount);

//   return (
//     <Grid container spacing={2} >
//       <Grid item xs={12} sm={6} md={8} lg={6}>
//         <CardComponent>
//           <Grid container justifyContent="space-between">
//             <Grid item xs={12} sm={6}>
//               <Grid container className="customer-id-wrapper">
//                 <Grid item>
//                   <span className="customer-id-text">Customer ID: </span>
//                 </Grid>
//                 <Grid item>
//                   <span className="customer-id-text">New</span>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Grid container className="contract-type-wrapper">
//                 <Grid item>
//                   <span className="contract-type"></span>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid container className="main-applicant-wrapper">
//             <Grid item>
//               <span className="main-applicant-name">M/S . SANKAR PVT LIMITED</span>
//             </Grid>
//           </Grid>
//           <Grid container className="mobile-no-view">
//             <Grid item xs={12} sm={6}>
//               <Grid container className="mobile-no-wrapper">
//                 {mobile_no !== null && (
//                   <>
//                     <Grid item>
//                       <span className="mobile-no-text">9374374376</span>
//                     </Grid>
//                     <Grid item>
//                       <button onClick={onPressMobileNumberClick} className="gif-wrapper">
//                         <FaPhone icon="fa-solid fa-phone" />
//                       </button>
//                     </Grid>
//                   </>
//                 )}
//               </Grid>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4} lg={6}>
//           <Grid container className="circularProgressWrapper" justify="center">
//             <Grid container className="circularProgress">
//               <CircularStatic />
//             </Grid>
//       </Grid>
//       </Grid>
//             <Grid item xs={12} sm={6}>
//               <Grid container className="status-wrapper">
//                 <Grid item>
//                   <span className="status-text">
//                     Status:
//                     <span className="status-color">Completed</span>
//                   </span>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid container className="row">
//             <Grid item>
//               <span className="location-text">ICF COLONY</span>
//             </Grid>
//             <Grid item>
//               <span className="loan-amount-text">Loan Amount: Rs 5000000</span>
//             </Grid>
//           </Grid>
//           <br />
//           <Grid item xs={12}>
//             <div className="enquiryDateBox">
//               <span className="date">EQ02377212</span>
//               <span className='date2'>23-MAY-2023</span>
//             </div>
//           </Grid>
      
//         </CardComponent>
//       </Grid>
//     </Grid>
//   );
// };

// export default ModifyEnquiry;


// import React from 'react';
// import { CircularProgress, Grid } from '@mui/material';
// import './ModifyEnquiry.css';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import { FaPhone } from 'react-icons/fa';
// import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
// import CircularStatic from './CircularProcessBar';

// const ModifyEnquiry = (props) => {
//   const {
//     EnquiryNumber,
//     CustomerId,
//     ContractType,
//     AssetClass,
//     MainApplicantName,
//     Location,
//     EnquirtyDate,
//     onPressMobileNumberClick,
//     Loan_Amount,
//     overAll_percenrtage,
//     mobile_no,
//     Status,
//   } = props;

//   function numberWithCommas(x) {
//     const formattedValue = x?.toString().split('.')[0].length > 3
//       ? x?.toString().substring(0, x?.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
//         ',' +
//         x?.toString().substring(x?.toString().split('.')[0].length - 3)
//       : x?.toString();
//     return 'Rs. ' + formattedValue;
//   }

//   const formatAmount = numberWithCommas(Loan_Amount);

//   return (
//     <Grid container spacing={12} >
//       <Grid item xs={12} sm={6} md={8} lg={12} >
//         <Grid container className="card-container">
//           <Grid item xs={12} className="card">
//             <Grid container justifyContent="space-between">
//               <Grid item xs={12} sm={6}>
//                 <Grid container className="customer-id-wrapper">
//                   <Grid item>
//                     <span className="customer-id-text">Customer ID: </span>
//                   </Grid>
//                   <Grid item>
//                     <span className="customer-id-text">New</span>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Grid container className="contract-type-wrapper">
//                   <Grid item>
//                     <span className="contract-type"></span>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid container className="main-applicant-wrapper">
//               <Grid item>
//                 <span className="main-applicant-name">M/S . SANKAR PVT LIMITED</span>
//               </Grid>
//             </Grid>
//             <Grid container className="mobile-no-view">
//               <Grid item xs={12} sm={6}>
//                 <Grid container className="mobile-no-wrapper">
//                   {mobile_no !== null && (
//                     <>
//                       <Grid item>
//                         <span className="mobile-no-text">9374374376</span>
//                       </Grid>
//                       <Grid item>
//                         <button onClick={onPressMobileNumberClick} className="gif-wrapper">
//                           <FaPhone icon="fa-solid fa-phone" />
//                         </button>
//                       </Grid>
//                     </>
//                   )}
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={6} md={4} lg={1}>
//                 <Grid container className="circularProgressWrapper" justify="center">
//                   <Grid container className="circularProgress">
//                     <CircularStatic />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Grid container className="status-wrapper">
//                   <Grid item>
//                     <span className="status-text">
//                       Status:
//                       <span className="status-color">Completed</span>
//                     </span>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid container className="row">
//               <Grid item>
//                 <span className="location-text">ICF COLONY</span>
//               </Grid>
//               <Grid item>
//                 <span className="loan-amount-text">Loan Amount: Rs 5000000</span>
//               </Grid>
//             </Grid>
//             <br />
//             <Grid item xs={12}>
//               <div className="enquiryDateBox">
//                 <span className="date">EQ02377212</span>
//                 <span className='date2'>23-MAY-2023</span>
//               </div>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default ModifyEnquiry;




import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import './ModifyEnquiry.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FaPhone } from 'react-icons/fa';
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import CircularStatic from './CircularProcessBar';

const ModifyEnquiry = (props) => {
  const {
    EnquiryNumber,
    CustomerId,
    ContractType,
    AssetClass,
    MainApplicantName,
    Location,
    EnquirtyDate,
    onPressMobileNumberClick,
    Loan_Amount,
    overAll_percenrtage,
    mobile_no,
    Status,
  } = props;

  function numberWithCommas(x) {
    const formattedValue = x?.toString().split('.')[0].length > 3
      ? x?.toString().substring(0, x?.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
        ',' +
        x?.toString().substring(x?.toString().split('.')[0].length - 3)
      : x?.toString();
    return 'Rs. ' + formattedValue;
  }

  const formatAmount = numberWithCommas(Loan_Amount);

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} sm={6} md={8} lg={12}>
        <Grid container className="card-container">
          <Grid item xs={12} className="card">
            <Grid container justifyContent="space-between">
              <Grid item xs={12} sm={6}>
                <Grid container className="customer-id-wrapper">
                  <Grid item>
                    <span className="customer-id-text">Customer ID: </span>
                  </Grid>
                  <Grid item>
                    <span className="customer-id-tet">New</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container className="contract-type-wrapper">
                  <Grid item>
                    <span className="contract-type">NEW VEHICLES|ICV</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container className="main-applicant-wrapper">
              <Grid item>
                <span className="main-applicant-name">M/S . SANKAR PVT LIMITED</span>
              </Grid>
            </Grid>
            <Grid container className="mobile-no-view">
              <Grid item xs={12} sm={6}>
                <Grid container className="mobile-no-wrapper">
                  {mobile_no !== null && (
                    <>
                      <Grid item>
                        <span className="mobile-no-text">9374374376</span>
                      </Grid>
                      <Grid item>
                        <button onClick={onPressMobileNumberClick} className="gif-wrapper">
                          <FaPhone icon="fa-solid fa-phone" />
                        </button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container className="circularProgressWrapper">
                  <Grid item className="circularProgress">
                    <CircularStatic />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container className="status-wrapper">
                  <Grid item>
                    <span className="status-text">
                      Status:
                      <span className="status-color">Completed</span>
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="row">
              <Grid item>
                <span className="location-text">ICF COLONY</span>
              </Grid>
              <Grid item>
                <span className="loan-amount-text">Loan Amount: Rs 5000000</span>
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <div className="enquiryDateBox">
                <span className="date">EQ02377212</span>
                <span className='date2'>23-MAY-2023</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModifyEnquiry;



