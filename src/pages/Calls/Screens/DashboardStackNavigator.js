import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,

  Image,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge,  withBadge } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { callListRequest, setCallDataState,callAddRequest } from '../Service';

import { screens } from '../../../navigation/RouteItems'
import { cleanUpData,
  instantiateAbort,ResponseToast,LoadingToast } from '../../../helpers/componentHelperFunc';
const BadgedIcon = withBadge(15)(Icon);

const Item = ({title}) => (
  <View style={styles.callContainer}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const Stack = createStackNavigator()

function Dashboard({ navigation }) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndofScrolling, setisAtEndofScrolling] = useState(false);

  const abortEffect = instantiateAbort();
  const dispatch = useDispatch();
  const fetchResponse = useSelector(state => {

    return state.callReducer.callDataState;
  });

  const fetchedData = useSelector(state => state.callReducer.data)
                      .sort(function (a, b) { return b.id - a.id; });
  
  useEffect(() => {

    const timer = setTimeout(() => {
     
    dispatch(setCallDataState("CALL_LIST_LOADING"))
    dispatch(callListRequest('calls/list'))
    if (fetchResponse != "" || fetchResponse == "CALL_LIST_LOADING") {
      setIsLoading(true) 
    }
      if (fetchResponse === "CALL_LIST_SUCCESS") {
        setIsLoading(false) 
    }
    }, 500);
    
    return () => {
      clearTimeout(timer)
      cleanUpData(abortEffect)
    }
  }, [])


    useEffect(() => {

    const timer = setTimeout(() => {

    }, 300);
    
    return () => {
      clearTimeout(timer)
     // cleanUpData(abortEffect)
    }
  }, [[useSelector(state =>  state.callReducer )]])

  function handleRefresh() {
    const timer = setTimeout(() => {
     <ActivityIndicator size="large" color="gray" />
    }, 500)
     return () => {
      clearTimeout(timer)
    }
  }

  function handleEnd() {
    return setPage(page + 1);
  }

  function gotoProfile() {
    dispatch(callAddRequest('user/calls/add'))
   // return navigation.navigate('Profile Screen');
  }
  function gotoSingleCall(callId) {
    return navigation.navigate('Call Screen', {callId: callId});
  }
  function gotoNewCall() {
    return navigation.navigate('New Call');
  }
  const renderItem = ({item:call}) => (
    <View styles={styles.container}>
      <View style={styles.flexRow}>
        

        <TouchableOpacity
          style={[styles.flexRow, styles.mt]}
          onPress={() => gotoProfile()}>
          <Text numberOfLines={1} style={styles.callPhoneNo}>
            {' '}
          
            {call.callingMobile}{' '} {call.id}
          </Text>
         
          {/* <Text numberOfLines={1} style={styles.callTime}>
             {format(new Date(call.created_at),'do  MMMM yyyy ')}
          </Text> */}
        
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.callContentContainer, styles.flexRow]}
        onPress={() => gotoSingleCall(call.id)}>
        <Text style={styles.callContent}>{call.incomingMessage}{'   '} </Text>
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
              
                {call.alertSent}{' '}
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
   {(isLoading ) ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={fetchedData}
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
            isAtEndofScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
          />
      )}
      </>
  )
}

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Dashboard} component={Dashboard} />
    </Stack.Navigator>
  )
}

export default DashboardStackNavigator
