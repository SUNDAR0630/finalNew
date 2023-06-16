/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useLayoutEffect,
  } from 'react';
  import {
    Alert,
    Animated,
    Platform,
    ScrollView,
    StyleSheet,
    BackHandler,
    TouchableOpacity,
    UIManager,
    View,
    Linking,
    RefreshControl,
  } from 'react-native';
  import Dialog from 'react-native-dialog';
  import FastImage from 'react-native-fast-image';
  import {Text} from 'react-native-elements';
  import {Button} from '@rneui/themed';
  // import { FAB } from 'react-native-elements';
  import SendIntentAndroid from 'react-native-send-intent';
  import NetInfo from '@react-native-community/netinfo';
  import RNFetchBlob from 'rn-fetch-blob';
  import SearchComponent from '../components/Search';
  import ModifyEnquiry from '../components/NewEnquiryList';
  import CustomAppBar from '../components/CustomAppBar';
  import OfflineNotice from '../components/OfflineNotice';
  import CustomDialogbox from '../components/CustomDialogBox';
  import {ApiHelper} from '../services/ApiHelper';
  import {
    getDBConnection,
    createTable,
    getRowCountResponse,
    fiToken_tableName,
    saveTokenResponse,
    getTokenResponse,
    fiUserPreference_tableName,
    // for sme
    saveFieldInvestigationResponse,
    fi_in_enq,
    fi_out_enq,
    getOutFITracEnquiry,
    fiDtls_tableName,
    saveInFITracEnquiry,
    saveOutFITracEnquiry,
    createInFITracTable,
    createOutFITracTable,
    deleteTable,
  } from '../services/dbservices';
  import {transaction} from '../transactionengine/transaction';
  
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  let navigationProp;
  
  let accessToken;
  let tokenType;
  let header_auth_value = '';
  
  let microappTokenValidated = false;
  
  export default function FITractorHome({navigation, route}) {
    const [showMessageVisible, setShowMessageVisible] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [active, setActive] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState(fi_list);
    const [masterDataSource, setMasterDataSource] = useState(fi_list);
    const [checkNetwork, setCheckNetwork] = React.useState();
    const [responseMessage, setResponseMessage] = useState();
    const [responseMessageVisible, setResponseMessageVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isUpdateAvailableShown, setIsUpdateAvailableShown] = useState(false);
  
    navigationProp = navigation;
    const formurlContentType = 'application/x-www-form-urlencoded';
    let props = route?.params;
  
    React.useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        onRefresh();
      });
      return focusHandler;
    }, [navigation]);
  
    const onRefresh = useCallback(() => {
      try {
        if (microappTokenValidated) {
          getPendingEnquiries();
        } else {
          getToken();
        }
        // getPendingEnquiries()
        //callMicroAppTokenValidation();
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      } catch (error) {
        Alert.alert('Something went wrong!!!');
      }
    }, []);
  
    const [fi_list, setFiList] = useState('');
    useEffect(() => {
      NetInfo.addEventListener(state => {
        setCheckNetwork(state?.isConnected);
      });
    }, []);
  
    React.useEffect(() => {
      if (search === '') {
        setMasterDataSource(fi_list);
      }
    }, [search]);
  
    useEffect(() => {
      getToken();
      // callMicroAppTokenValidation();
    }, []);
  
    const getAppVersion = async () => {
      setDialogVisible(true);
      let inputReqParams = {
        userid: props?.USER_ID,
        deviceind: 'A',
        version: ApiHelper.version,
        loginlogrefkey: props?.LOGIN_LOG_REF_KEY,
        devicesecid: props?.DEVICE_SEC_ID,
        apkname: ApiHelper.apkName,
        apktype: '',
      };
      const getAppVersionRes = await ApiHelper.postData(
        ApiHelper.appVersion_api,
        ApiHelper.postMethod,
        ApiHelper.appljsonContentType,
        {},
        inputReqParams,
      );
      try {
        if (getAppVersionRes.ok) {
          const json = await getAppVersionRes.json();
          if (
            json !== undefined &&
            json?.response_code === '0' &&
            json?.updatetype === 'U'
          ) {
            setIsUpdateAvailableShown(true);
          } else {
            setIsUpdateAvailableShown(false);
            await getPendingEnquiries();
          }
        }
      } catch (error) {
        console.log(error);
      }
      setDialogVisible(false);
    };
  
    const getAppUpdate = async () => {
      setDialogVisible(true);
      let details = {
        inputData: {
          userid: props?.USER_ID,
          deviceind: 'A',
          version: ApiHelper.version,
          loginlogrefkey: props?.LOGIN_LOG_REF_KEY,
          devicesecid: props?.DEVICE_SEC_ID,
          apkname: ApiHelper.apkName,
        },
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(JSON.stringify(details[property]));
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      const db = await getDBConnection();
      let header_auth_value = await getTokenResponse(db, fiToken_tableName);
      let dirs = RNFetchBlob.fs.dirs;
      const android = RNFetchBlob.android;
      RNFetchBlob.config({
        path: dirs.SDCardApplicationDir + '/files/FieldInvestigation.apk',
      })
        .fetch(
          'POST',
          ApiHelper.appUpdate_api,
          {
            Authorization: header_auth_value,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          formBody,
        )
        .then(res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          setDialogVisible(false);
          if (res?.respInfo?.status === 200) {
            setIsUpdateAvailableShown(false);
            android
              .actionViewIntent(
                res.path(),
                'application/vnd.android.package-archive',
              )
              .then(() => {
                console.log('File opened');
              })
              .catch(e => {
                console.log('Unable to open file');
              });
          } else {
            console.log('getAppUpdate else');
          }
        })
        .catch(error => {
          console.log(error);
          setDialogVisible(false);
        });
    };
  
    const onPressButton = async () => {
      await getAppUpdate();
    };
  
    const callMicroAppTokenValidation = async () => {
      setDialogVisible(true);
      let inputReqParams = {
        user_id: props?.USER_ID,
        app_ref_code: props?.COMPONENET_CODE,
        app_token: props?.APP_TOKEN,
        login_log_ref_key: props?.LOGIN_LOG_REF_KEY,
        device_sec_id: props?.DEVICE_SEC_ID,
      };
  
      const getMicroAppTokenRes = await ApiHelper.postData(
        ApiHelper.microAppToken_api,
        ApiHelper.postMethod,
        ApiHelper.appljsonContentType,
        {},
        inputReqParams,
      );
      try {
        if (getMicroAppTokenRes.ok) {
          const json = await getMicroAppTokenRes.json();
          if (json !== undefined && json.response_code === '0') {
            try {
              microappTokenValidated = true;
              setMessageText('');
              setShowMessageVisible(false);
              setValidUser(true);
              await getAppVersion();
              // await getPendingEnquiries();
              // getToken();
            } catch (error) {
              setDialogVisible(false);
            }
          } else {
            //console.log('Unauthorized User Entry. Try again Via One App');
            setDialogVisible(false);
            setShowMessageVisible(true);
            setValidUser(false);
            setMessageText('Unauthorized User Entry. Try again Via One App');
          }
        } else {
          setDialogVisible(false);
        }
      } catch (error) {
        console.log(error);
        setDialogVisible(false);
      }
    };
  
    async function getToken() {
      setDialogVisible(true);
      try {
        const db = await getDBConnection();
        const fiTokenTableCount = await getRowCountResponse(
          db,
          fiToken_tableName,
        );
        if (fiTokenTableCount === 0) {
          await createTable(db, fiToken_tableName, 'value');
        }
        const fiUserPreferenceTableCount = await getRowCountResponse(
          db,
          fiUserPreference_tableName,
        );
        if (fiUserPreferenceTableCount === 0) {
          await createTable(db, fiUserPreference_tableName, 'value');
        }
        const getTokenReqOpt = {
          method: 'POST',
          headers: {
            'Content-Type': formurlContentType,
            Authorization: ApiHelper.apiKey,
          },
        };
        const getTokenRes = await fetch(
          ApiHelper.genarateTokenURL,
          getTokenReqOpt,
        );
        try {
          if (getTokenRes.ok) {
            const json = await getTokenRes.json();
            accessToken = json.access_token;
            tokenType = json.token_type;
            header_auth_value = tokenType + ' ' + accessToken;
  
            await saveTokenResponse(db, header_auth_value, fiToken_tableName);
          //   await callMicroAppTokenValidation();
            await getPendingEnquiries()
          } else {
            setDialogVisible(false);
            Alert.alert(
              'Error!!!',
              'We are unable to connect to our Servers... Please try again later',
              [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ],
            );
          }
        } catch (e) {
          setDialogVisible(false);
          Alert.alert(
            'Error!!!',
            'We are unable to connect to our Servers... Please try again later',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      } catch (e) {
        console.log(e);
        console.log('Token Generation Failed Error Outer');
        setDialogVisible(false);
        Alert.alert(
          'Error!!!',
          'We are unable to connect to our Servers... Please try again later',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
      setDialogVisible(false);
    }
  
    async function getPendingEnquiries() {
      let inputParamsFI = {
        "user_id": "003425",
        "employee_code": "3425 ",
        "user_role": "FO",
        "user_branch_code": "902  ",
        "login_ref_key": "50407",
        "device_sec_id": "010cf4f966179be9",
        // "user_id": route?.params?.USER_ID,
        // "employee_code": route?.params?.EMP_CODE,
        // "user_role": route?.params?.USER_ROLE,
        // "user_branch_code": route?.params?.USER_BRANCH_CODE,
        // "login_ref_key": route?.params?.LOGIN_LOG_REF_KEY,
        // "device_sec_id": route?.params?.DEVICE_SEC_ID,
        cutoff_month: '',
        access_token: '',
        device_type: '',
        app_ind: '',
        process_type_id: '1',
        data_fetch_mode: 'F',
  
        //sme input request
  
        // "user_id": "003425",
        // "employee_code": "3425",
        // "user_role": "BM",
        // "user_branch_code": "152",
        // "cutoff_month": "",
        // "access_token": "",
        // "login_ref_key": "",
        // "device_sec_id": "",
        // "device_type": "",
        // "app_ind": "",
        // "process_type_id": "1",
        // "data_fetch_mode": "F",
        // "save_flag": "P",
        // "ip_enquiry_number": ""
      };
      setDialogVisible(true);
      const getFIDetailsRes = await ApiHelper.postData(
        ApiHelper.pendingenquiryfetch_api,
        // ApiHelper.smeEnquiryDetails,
        ApiHelper.postMethod,
        ApiHelper.appljsonContentType,
        {},
        inputParamsFI,
      );
      try {
        if (getFIDetailsRes.ok) {
          const json = await getFIDetailsRes.json();
          console.log(JSON.stringify(inputParamsFI),"inputParamsFI")
          console.log(JSON.stringify(json),"json")
          if (json?.response_code !== '0') {
            setResponseMessage(json?.response_message);
            setResponseMessageVisible(true);
          } else {
            if (json !== null && json !== undefined) {
              await createAndSaveFieldInvestigationResponse(json);
            } else {
              setDialogVisible(false);
              Alert.alert(
                'Error!!!',
                'We are unable to connect to our Servers... Please try again later',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          }
        } else {
          setDialogVisible(false);
          Alert.alert(
            'Error!!!',
            'We are unable to connect to our Servers... Please try again later',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      } catch (error) {
        setDialogVisible(false);
        setDialogVisible(false);
        Alert.alert(
          'Error!!!',
          'We are unable to connect to our Servers... Please try again later',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
      setDialogVisible(false);
    }
  
    const createAndSaveFieldInvestigationResponse = async inputResposneJson => {
      if (inputResposneJson?.response_code === '0') {
        if (inputResposneJson?.response_Details?.fi_list?.length > 0) {
          setDialogVisible(true);
          let filistdata = inputResposneJson?.response_Details?.fi_list;
          setFiList(filistdata);
          setMasterDataSource(filistdata);
          setFilteredDataSource(filistdata);
          setDialogVisible(false);
          fadeIn();
        } else {
          Alert.alert(
            'Information!!!',
            'No Pending Enquiries available to do FI..!!!',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      }
    };
    const searchFilterFunction = text => {
      const re = /^[ A-Za-z0-9_@./#&+-]*$/;
      if (re.test(text)) {
        if (text) {
          const newData = filteredDataSource.filter(function (item) {
            const requiredData = `{${item.main_applicant_name}
                           ${item.enquiry_number} ${item.main_applicant_location_name} ${item.enquiry_date} ${item?.mobile_no}}`;
            const itemData = requiredData
              ? requiredData.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setMasterDataSource(newData);
          setSearch(text);
        } else {
          setMasterDataSource(filteredDataSource);
          setSearch(text);
        }
      }
    };
  
    const onCancelText = () => {
      setSearch('');
      setMasterDataSource(filteredDataSource);
    };
    // function handleBackButtonClick() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
  
    const onPressMobileNumberClick = number => {
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
  
      Linking.openURL(phoneNumber);
    };
  

                  















    
    
    const Item = ({i, active, setActive, key, xy, setSearch}) => {
      const onPress = () => {
        // onCheckNetwork()
        // //console.log("xydsfsdfsdf");
        setActive(i == active ? null : i);
        if (i == active ? null : i === i) {
          navigationProp.navigate('FI_CUSTOMER_DETAILS', {
            enqPos: i,
            enqNo: xy?.enquiry_number,
            fi_list: fi_list,
          });
          setSearch('');
        }
      };
  
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={onPress}
          activeOpacity={1}
          key={i}>
          <ModifyEnquiry
            CustomerId={
              xy?.header_info[0]?.customer_code === null || undefined
                ? xy?.header_info[0]?.customer_type
                : xy?.header_info[0]?.customer_code
            }
            MainApplicantName={xy?.main_applicant_name}
            ContractType={xy?.contract_type_desc}
            AssetClass={xy?.asset_class_desc}
            Location={xy?.main_applicant_location_name}
            EnquirtyDate={xy?.enquiry_date}
            EnquiryNumber={xy?.enquiry_number}
            Loan_Amount={xy?.loan_amount}
            overAll_percenrtage={
              xy?.answer_percentage === null ||
              xy?.answer_percentage === undefined ||
              xy?.answer_percentage === ''
                ? 0
                : xy?.answer_percentage
            }
            mobile_no={xy?.mobile_no}
            Status={xy?.fi_status_desc}
            onPressMobileNumberClick={() =>
              onPressMobileNumberClick(xy?.mobile_no)
            }
          />
        </TouchableOpacity>
      );
  
    
    };
 
  
    return (
      <View>
        {checkNetwork === false && <OfflineNotice checkNetwork={checkNetwork} />}
        <View style={{height: '100%', width: '100%'}}>
          <CustomAppBar iconVisible={true} backArrowVisible={false} />
          <View style={{paddingBottom: 3, backgroundColor: '#004A96'}}>
   
            <SearchComponent
              searchFilterFunction={val => searchFilterFunction(val)}
              search={search}
              onCancelText={onCancelText}
              placeholder="Appl Name / Enq No / Location / Date /Mob No"
            />
          </View>
          {masterDataSource?.length === 0 && (
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: '#004a96',
                  fontWeight: 'bold',
                }}>
                No Data to display
              </Text>
            </View>
          )}
          <ScrollView
            style={{flexGrow: 1}}
            nestedScrollEnabled={true}
            horizontal={false}
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {masterDataSource !== '' ? (
              masterDataSource?.map((x, i) => {
                return (
                  <View key={i}>
                    <Animated.View
                      style={[styles.fadingContainer, {opacity: fadeAnim}]}
                      key={i}>
                      <Item
                        active={active}
                        i={i}
                        setActive={setActive}
                        xy={x}
                        setSearch={setSearch}
                      />
                    </Animated.View>
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
          <Dialog.Container
            visible={responseMessageVisible}
            contentStyle={{height: 125, padding: 8}}>
            <Text
              style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
              {responseMessage}
            </Text>
            <Dialog.Button
              label="Ok"
              style={{
                marginTop: 10,
                padding: 5,
                paddingRight: 10,
                color: '#004a92',
                fontWeight: 'bold',
              }}
              onPress={() => setResponseMessageVisible(false)}
            />
          </Dialog.Container>
          <Dialog.Container
            visible={dialogVisible}
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <>
              <FastImage
                source={require('../assets/gifs/loading.gif')}
                style={{width: 90, height: 90}}
              />
              <Text style={{color: '#000000', fontSize: 14, paddingTop: 5}}>
                Loading Please wait...
              </Text>
            </>
          </Dialog.Container>
          <Dialog.Container
            visible={showMessageVisible}
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', textAlign: 'center', marginBottom: 20}}>
              {messageText}
            </Text>
            <Button
              title="OK"
              buttonStyle={{
                backgroundColor: '#004a92',
                fontSize: 20,
                textTransform: 'uppercase',
                borderRadius: 20,
                padding: 8,
              }}
              onPress={() => {
                SendIntentAndroid.isAppInstalled('in.sis.oneapp').then(
                  isInstalled => {
                    if (isInstalled) {
                      SendIntentAndroid.openApp('in.sis.oneapp').then();
                    } else {
                      BackHandler.exitApp();
                    }
                  },
                );
              }}
            />
          </Dialog.Container>
        </View>
        {isUpdateAvailableShown && (
          <CustomDialogbox
            title="Update"
            Description="Update is available"
            button1="OK"
            onPressButton={onPressButton}
            dialogVisible={isUpdateAvailableShown}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
    },
    item: {
      width: '100%',
      paddingVertical: 5,
      paddingLeft: 2,
    },
    subItem: {
      borderWidth: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    HStack: {},
    FOID: {
      fontSize: 18,
      color: 'black',
      width: '100%',
    },
    FOName: {
      fontSize: 18,
      color: '#AAAAAA',
    },
    Location: {
      color: '#aaaaaa',
    },
    EnquiryBox: {
      marginTop: 8,
      marginLeft: 12,
    },
    ApplBox: {
      marginTop: 8,
      marginLeft: 12,
      backgroundColor: '#f2f2f2',
    },
    EnquiryDateBox: {
      width: 110,
      textAlign: 'right',
    },
    EnqDate: {
      color: '#7f7f7f',
      textAlign: 'right',
      marginTop: 8,
      marginLeft: 12,
    },
    detaliView: {
      padding: 20,
    },
    detailsHeadText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  