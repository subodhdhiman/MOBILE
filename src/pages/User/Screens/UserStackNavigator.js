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
import { userListRequest, setUserDataState } from '../Service';

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

function User({ navigation }) {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndofScrolling, setisAtEndofScrolling] = useState(false);

  // const { calldata, user } = useContext(AuthContext);
  const abortEffect = instantiateAbort();
  const dispatch = useDispatch();
  const fetchResponse = useSelector(state => {
    console.log('State::::::::: Response ', state.userReducer);
    return state.userReducer.userDataState;
  });

  const fetchedData= useSelector(state => {
    console.log('State:::::::::Data ', state.userReducer.data);
    return state.userReducer.data;
  });
  useEffect(() => {

    const timer = setTimeout(() => {
      console.log('fetchResponse ::-----------------------', fetchResponse)
     
    dispatch(setUserDataState("USER_LIST_LOADING"))
    dispatch(userListRequest('/user/calls'))
    if (fetchResponse != "" || fetchResponse == "USER_LIST_LOADING") {
      LoadingToast("top", "Loading, please wait..", "success");
    }
    if (fetchResponse === "USER_LIST_SUCCESS") {
      navigation.navigate("DExistsStack");
    }
    if (fetchResponse == "USER_LIST_ERROR") {
      if (typeof fetchResponse === "string") {
        ResponseToast("top", "Close", "danger", fetchResponse, 6000);
            
      } else if (typeof fetchResponse === "object") {
        Object.keys(fetchResponse).map((keys, index) => {
        
          ResponseToast("top", "Close", "danger", fetchResponse[keys][0], 6000);
        })
      }
      }
    }, 3000);
    
    return () => {
      console.log( 'Cleaning and Aborting Tasks')
      clearTimeout(timer)
      cleanUpData(abortEffect)
    }
  }, [])

    
  function getAllCalls() {
    console.log('Homedata Stack Into function call-----------------------');
    return axiosConfig
      .get(`/calls?page=${page}`)
      .then(response => {
        
        if (!response.data.next_page_url) {
          setisAtEndofScrolling(true);
        }
   //     console.log(' Here getting Data ',response)
        setIsLoading(false);
        setIsRefreshing(false);
         console.log(' Console log  ---- Here getting Data')
        if (page == 1) {
          setData(response.data.data);
          // setCallData(response.data.data)
        } else {
          setData([...data, ...response.data.data]);
        }
         setIsLoading(false);
      })
      .catch(error => {
        console.log('Error Home Screen : -- data ', data, 'error : ',error );
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
  const renderItem = ({item:call}) => (
    <View styles={styles.container}>
      <View style={styles.flexRow}>
        

        <TouchableOpacity
          style={[styles.flexRow, styles.mt]}
          onPress={() => gotoProfile()}>
          <Text numberOfLines={1} style={styles.callPhoneNo}>
            {' '}
          
            {call.callingMobile}{' '}
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
   {(fetchResponse == 'USER_LISTdd_LOADING'  ) ? (
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
            !isAtEndofScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
          />
      )}
      </>
  )
}

const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.User} component={User} />
    </Stack.Navigator>
  )
}

export default UserStackNavigator
