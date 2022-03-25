/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  label,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import CallDetectorManager from "react-native-call-detection";
import Contacts from 'react-native-contacts';
// import SendSMS from 'react-native-sms';
import { showLocalNotification } from './pushNotification';
// import Voice from 'react-native-voice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureOn: false,
      incoming: false,
      number: null,
      contacts: [],
      displayName: '',
      showMessage: null,
      showTextMessage: '',
      setTextMessage: '',
      answerMessage: '',
      tempNumber: ''
    };
  }
  componentDidMount() {
    this.askPermission();
    this.contactsList();
    this.startListenerTapped();
    
  }

  askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        ]);
      console.log('Permissions are: ', permissions);
    } catch (err) {
      console.warn(err);
    }
  };

//   initiateSMS = (mobileNumber: number) => {

//     SendSMS.send(
//       {
//         // Message body
//         body: "Test SMS",
//         // Recipients Number
//         recipients: ['+919891362266'],
//         // An array of types
//         // "completed" response when using android
//         successTypes: ['sent', 'queued'],
//       },
//       (completed, cancelled, error) => {
//         if (completed) {
//           console.log('SMS Sent Completed');
//         } else if (cancelled) {
//           console.log('SMS Sent Cancelled');
//         } else if (error) {
//           console.log('Some error occured');
//         }
//       },
//     );
//   };

  startListenerTapped = () => {
    this.setState({ featureOn: true });
    // this.storeData();
    this.callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === "Disconnected") {
          // Do something call got disconnected
          this.setState({ incoming: false, number: null });
        } else if (event === "Incoming") {
          // Do something call got incoming
          this.setState({ incoming: true, number, displayName: '',showTextMessage: '', showNotificationExist: null, setTextMessage: '', tempNumber: number });
        } else if (event === "Offhook") {
          //Device call state: Off-hook.
          // At least one call exists that is dialling,
          // active, or on hold,
          // and no calls are ringing or waiting.
         // this.startRecording();
          this.setState({ incoming: true, number });
        } else if (event === "Missed") {
          // Do something call got missed
       
          this.setState({ incoming: false, number: null, displayName: '', showNotificationExist: this.state.number });
        }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => { }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: "Phone State Permission",
        message:
          "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
      } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  };
  stopListenerTapped = () => {
    this.setState({ featureOn: false });
    this.callDetector && this.callDetector.dispose();
  };

  getText = () => {
    console.log('settext', this.state.setTextMessage);
    if (this.state.setTextMessage.toLowerCase() === 'test') {
    this.setState({ showTextMessage: 'i am calling from hdfc loan department', answerMessage: 'not interested' });
    } else if (this.state.setTextMessage.toLowerCase() === 'test1') {
      this.setState({ showTextMessage: 'i am calling from bajaj finance department', answerMessage: 'not interested for thi offer' });
    } else if (this.state.setTextMessage.toLowerCase() === 'test2') {
      this.setState({ showTextMessage: 'i am calling from icici loan department', answerMessage: 'disconnect' });
    } 
  };

  setText = (e) => {
    this.setState({ setTextMessage: e });
  };

  getContactDetails = (num: string) => {
   
    Contacts.getContactsByPhoneNumber(num).then(contacts => {
      this.setState({ displayName: JSON.stringify(contacts[0].displayName) });
    });
  };

  showNotificationAndIncomingNumber = (number: string) => {
    this.getContactDetails(number);
    if (!!this.state.displayName) {
      // showLocalNotification(this.state.number)
    }
    console.log('contacts', this.state.displayName);
    return this.state.displayName + number;
  };

  

showNotificationExist() {
    console.log('hi');
      showLocalNotification(this.state.showNotificationExist, 'Suggestion: Number is blackListed');  
  };

  showNotificationNotExist(message: string) {
    console.log('hi');
      showLocalNotification(this.state.showNotificationExist, 'Suggestion: Number is not blackListed'); 
  };

  contactsList = async () => {
    try {
      const andoidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts Permission",
          message:
            "This app would like to view your contacts.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Contacts Permission granted");
        Contacts.getAll().then(contacts => {
          this.setState({ contacts: contacts });
        })
      } else {
        console.log("Contacts permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>AI 5</Text>
        
        {this.state.incoming && (
          <Text style={{ fontSize: 15 }}>Number:
            {this.showNotificationAndIncomingNumber(this.state.number)}
          </Text>
        )}
        { ( this.state.showNotificationExist && !this.state.displayName) && (
        
                     <><Text style={{ fontSize: 20 }}>
                    { this.state.tempNumber.includes('8800322631') ? 'Suggestion : Number is blacklisted' : ''}
                </Text>
                { this.state.showTextMessage === '' && (
                      <><TextInput value={this.state.setTextMessage} onChangeText={newText => this.setText(newText)}></TextInput><TouchableOpacity onPress={this.getText}>
                      <View>
                        <Text style={{fontSize: 20}}>Click</Text>
                      </View>
                    </TouchableOpacity></>
                )}
                    </>
                   )
                   
        }
        {
          this.state.showTextMessage != '' && (
            <><><Text style={{ fontSize: 15, color: 'blue' }}>
              {this.state.showTextMessage}
            </Text>
              <TouchableOpacity onPress={() => this.setState({ showTextMessage: '', answerMessage: '' })}>
                <View>
                  <Text style={{ fontSize: 20 }}>back</Text>
                </View>
              </TouchableOpacity></><Text style={{ fontSize: 15, color: 'green' }}>
                {this.state.answerMessage}
              </Text></>
          )}
            </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "honeydew",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    padding: 5,
    fontSize: 20
  }
});
