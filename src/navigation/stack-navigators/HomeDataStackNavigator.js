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

import { format } from 'date-fns';
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

function HomeData({navigation}) {
 const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndofScrolling, setisAtEndofScrolling] = useState(false);
   const { calldata,setCallData, user } = useContext(AuthContext);
  // Check mounted or not as result will take some time to respond back
//setIsLoading(true)
  useEffect(() => {
    
    console.log(' Inside Login Stack user found home screen ====+++++++++++++++')


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
         
          <Text numberOfLines={1} style={styles.callTime}>
             {format(new Date(call.created_at),'do  MMMM yyyy ')}
          </Text>
        
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.callContentContainer, styles.flexRow]}
        onPress={() => gotoSingleCall(call.id)}>
        <Text style={styles.callContent}>{call.incoming_message}{'   '} </Text>
      </TouchableOpacity>
<View style={styles.flexRow}>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            
            marginBottom: 1,
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
      <View style={styles.flexRow}>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
            marginBottom: 20,
          }}
         >   
          <View style={{marginRight:1, }}>
            <Text style={{color:'green', fontWeight: 'bold',}}>Today</Text>
            <Badge
                status="error"      
              value={6}
              containerStyle={{ marginTop: -30,margin:10 }}
              />      
            </View>
          </View> 
        </TouchableOpacity>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 30,
                  marginBottom: 20,
                  marginLeft:20,
                }}
              >   
                <View style={{marginRight:10, }}>
                  <Text style={{color:'green', fontWeight: 'bold'}}>Yesterday</Text>
                  <Badge
                      status="warning"      
                    value={3}
                    containerStyle={{ marginTop: -30,margin:10 }}
                    />      
                  </View>
                </View> 
        </TouchableOpacity>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
                  marginBottom: 20,
                  marginLeft:20,
          }}
         >   
          <View style={{marginRight:10, }}>
            <Text style={{color:'green', fontWeight: 'bold'}}>Week</Text>
            <Badge
                status="error"      
              value={18}
              containerStyle={{ marginTop: -30,margin:10 }}
              />      
            </View>
          </View> 
        </TouchableOpacity>
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
           marginTop: 30,
                  marginBottom: 20,
                  marginLeft:20,
          }}
         >   
          <View style={{marginRight:10, }}>
            <Text style={{color:'blue', fontWeight: 'bold'}}>Month</Text>
              <Badge
                size="large"
                status="primary"      
              value={29}
              containerStyle={{ marginTop: -30,margin:10 }}
              />      
            </View>
          </View> 
        </TouchableOpacity>
 
        <TouchableOpacity style={[styles.callEngagement, styles.ml4]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
           marginTop: 30,
                  marginBottom: 20,
                  marginLeft:20,
          }}
         >   
          <View style={{marginRight:30, }}>
            <Text style={{color:'green', fontWeight: 'bold'}}>All</Text>
            <Badge
                status="success"      
              value={48}
               containerStyle={{ marginTop: -30,margin:10 }}
              />      
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
            <View style={{borderBottomWidth:1,borderBottomColor:'gray',}} />
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

const HomeDataStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.HomeData} component={HomeData} />
    </Stack.Navigator>
  )
}

export default HomeDataStackNavigator
