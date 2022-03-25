import React,{useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { cleanUpData,
  instantiateAbort } from '../../helpers/componentHelperFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../pages/Home/styles'
import { setStorageValue, getStorageValue } from '../../common/storeDataValue';
import { ActivityIndicator } from 'react-native';
import {  useSelector } from 'react-redux';
// For Navigation
import { screens } from '../RouteItems'
const Stack = createStackNavigator()

function Home({navigation}) 
{
    const [visible, setVisible] = React.useState(true);


    const abortEffect = instantiateAbort();
    const loginStatus = useSelector(state => {
  //  console.log('Home Page State::::::::: ', state);
    return state.authReducer.dataState;
    });
  
    useEffect(() => {
        
        const bootstrapAsync = async() =>
        {
          // let token = getStorageValue('token');
          //  console.log(' Home token :: ', token)
          //  navigation.navigate('LoginStack');
         if(loginStatus == null  || loginStatus == '')
         {
            navigation.navigate('LoginStack');
         }else 
         {
            navigation.navigate('DashboardStack');
         }

        }

        bootstrapAsync();
         
        return () => {
            cleanUpData(abortEffect)
        }
    }, [])

    

    return (
        
            <View>
                <View style={styles.centerContent}>
   
                
                        <ActivityIndicator size="large" color="gray" />

               

                </View>
               
            </View>
      
    )
}

export default  HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={Home} />
    </Stack.Navigator>
  )
}