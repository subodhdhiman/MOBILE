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
//import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import {styles} from '../../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDistance from '../../helpers/formatDistanceCustom';

import { format, formatDistanceToNowStrict } from 'date-fns';
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

function Book({navigation}) {
 const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndofScrolling, setisAtEndofScrolling] = useState(false);
  

  useEffect(() => {
    
 
    setIsLoading(false);
      
     getAllCalls()
  
    // When request is finished:
  }, [page]);
  let temp = 'UserId';
  function getAllCalls() {
    console.log('Homedata Stack Into function call-----------------------');
    return axiosConfig
      .get(`/Calls/DetailsByDay/${temp}`)
      .then(response => {
        
        if (!response.data.next_page_url) {
          setisAtEndofScrolling(true);
        }
        console.log(' Here getting Data ',response.data)
        setIsLoading(false);
        setIsRefreshing(false);
         console.log(' Console log  ---- Here getting Data')
        if (page == 1) {
          setData(response.data);
      
        } else {
          setData(response.data);
       //  setData([...data,...response.data]);  
        }
         setIsLoading(false);
        setIsRefreshing(false);
        console.log('Response Home Screen222 : --', response.data,'page----- -------- ',data);
      })
      .catch(error => {
        console.log('Book Error Home Screen : -- data ', data, 'error : ',error );
        setIsLoading(false);
          console.log('Error Home Screen IsLoading Value ',isLoading );
        setIsRefreshing(false);
      });
  }

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
             {format(new Date(call.created_at),'E, dd-MM-yy ')}
            {formatDistanceToNowStrict(new Date(call.created_at), {
                locale: {
                  ...locale,
                  formatDistance,
                },
             })} {'ago'}
         </Text>
        
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.callContentContainer, styles.flexRow]}
        onPress={() => gotoSingleCall(call.id)}>
        <Text style={styles.callContent}>{call.incoming_message}{'   '}</Text>
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
   {isLoading   ? (
        // <ActivityIndicator size="large" color="gray" />
     <Text>Call not received during this period</Text>
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

export default BookStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Book} component={Book} />
    </Stack.Navigator>
  )
}


