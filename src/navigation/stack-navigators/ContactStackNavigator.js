import React, {useState, useEffect, useRef,useContext} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';

//import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import {styles} from '../../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { format} from 'date-fns';
import locale from 'date-fns/locale/en-US';

import { Avatar, Badge,  withBadge } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from '../../context/AuthProvider';

import { screens } from '../RouteItems'

const BadgedIcon = withBadge(15)(Icon);

const Item = ({title}) => (
  <View style={styles.callContainer}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Stack = createStackNavigator()

const ContactStackNavigator = () =>  {
 const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndofScrolling, setisAtEndofScrolling] = useState(false);

  const { calldata, setCallData, user } = useContext(AuthContext);
  
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    
    console.log(' Inside Login Stack user found ====+++++++++++++++',user)

 
       setIsLoading(false);
      
  
  
    // When request is finished:
  }, []);


  function handleRefresh() {
    setPage(1);
    setisAtEndofScrolling(false);
    getAllCalls();
    setIsRefreshing(true);
  }

  function handleEnd() {
    return setPage(page + 1);
  }

  function gotoProfile() {
    return navigation.navigate('Profile Screen');
  }
  function gotoSingleCall(callId) {
    return navigation.navigate('Call Screen', {callId: callId});
  }
  function gotoNewCall() {
    return navigation.navigate('New Call');
  }
  const renderItem = ({item: call}) => (
    <View styles={styles.container}>
      <View style={styles.flexRow}>
        

        <TouchableOpacity
          style={[styles.flexRow, styles.mt]}
          onPress={() => gotoProfile()}>
          <Text numberOfLines={1} style={styles.callPhoneNo}>
            {' '}
            {call.calling_mobile}{' '}
          </Text>
         
           
            
<Text style={styles.callTime}>
             {format(new Date(call.created_at),'dd/MM/yyyy')}
           
         </Text>
        
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.callContentContainer, styles.flexRow]}
        onPress={() => gotoSingleCall(call.id)}>
        <Text style={[styles.callContent]}>{call.incoming_message}{'   '} </Text>
      </TouchableOpacity>

      <View style={styles.flexRow}>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 3,
            marginBottom: 10,
          }}
         >   
          <View style={{marginRight:10, }}>
            <Text style={{color:'green', fontWeight: 'bold'}}>
              
                {call.alert_sent}{' '}  
                </Text>
            </View>
          </View> 
        </TouchableOpacity>
      
      </View>
      
    </View>
  );


  return (
    
    <>
   {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ItemSeparatorComponent={() => (
            <View style={styles.ItemSeparatorComponent} />
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtEndofScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
          />
      )}

    
      </>
  )
}
export default ContactStackNavigator
