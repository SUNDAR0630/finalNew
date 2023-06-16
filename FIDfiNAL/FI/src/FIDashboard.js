import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#ffffff',
  },
  customerId: {
    color: '#000000',
    fontSize: 12,
  },
  assetClass: {
    maxWidth: 190,
    fontSize: 11,
    color: '#004a92',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  normalStyle: {
    fontSize: 14,
    color: '#004a92',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  mainApplicantName: {
    fontSize: 15,
    color: '#004a92',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  enquiryDateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: '100%',
    backgroundColor: '#2288d5',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  date: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mobileNoView: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '100%',
  },
}));

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

  const classes = useStyles();

  function numberWithCommas(x) {
    var formattedValue = x.toString().split('.')[0].length > 3 ? x.toString().substring(0, x.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + x.toString().substring(x.toString().split('.')[0].length - 3) : x.toString();
    return 'Rs. ' + formattedValue;
  }

  var formatAmount = numberWithCommas(Loan_Amount);

  return (
    <div className={classes.card}>
      <Grid container direction="column" alignItems="stretch" style={{ padding: 10, paddingBottom: 0 }}>
        <Grid item container justify="space-between">
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography className={classes.customerId}>Customer ID: {CustomerId}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.assetClass}>
            <Typography>{`${ContractType} | ${AssetClass}`}</Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography className={classes.mainApplicantName}>{MainApplicantName}</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <AnimatedCircularProgress
                size={36}
                width={4}
                duration={0}
                fill={overAll_percenrtage}
                tintColor="#39b519"
                backgroundColor="#d7d7d7"
              >
                {() => (
                  <div>
                    <Typography variant="body2" style={{ fontSize: 7, fontWeight: 'bold' }}>
                      {overAll_percenrtage}%
                    </Typography>
                  </div>
                )}
              </AnimatedCircularProgress>
            </div>
          </Grid>
        </Grid>
        <Grid item container className={classes.mobileNoView}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {mobile_no !== null && (
              <>
                <Typography style={{ fontSize: 12, color: 'black' }}>{mobile_no}</Typography>
                <button onClick={onPressMobileNumberClick} style={{ paddingLeft: 4 }}>
                  <FastImage
                    source={require('../assets/gifs/questions.gif')}
                    style={{ width: 25, height: 25, bottom: 5 }}
                  />
                </button>
              </>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} style={{ textAlign: 'right' }}>
            <Typography style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
              Status: <span style={{ color: '#004a92' }}>{Status}</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Typography style={{ color: '#000000', fontSize: 12, paddingTop: 5, maxWidth: 150 }}>{Location}</Typography>
          <Typography style={{ color: '#000000', fontSize: 12, paddingTop: 5, paddingLeft: 2 }}>
            Loan Amount: {formatAmount}
          </Typography>
        </Grid>
      </Grid>
      <div>
        <div className={classes.enquiryDateBox}>
          <Typography className={classes.date}>{EnquiryNumber}</Typography>
          <Typography className={classes.date}>{EnquirtyDate}</Typography>
        </div>
      </div>
    </div>
  );
};

export default ModifyEnquiry;
