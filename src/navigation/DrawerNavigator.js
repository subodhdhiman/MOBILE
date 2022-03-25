import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/AntDesign';

import BottomTabNavigator from './BottomTabNavigator'
import { routes, screens } from './RouteItems'
import { Fade } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../pages/Auth/Service';

 
const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name
 // console.log('currentRouteName ', currentRouteName)
  const dispatch = useDispatch(); 
  let removeRoute = []
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated  );
  if (isAuthenticated) {
//    console.log(' Drawer User found ====', user)
    // removeRoute = ['LoginStack', 'RegisterStack','ForgotPasswordStack']
     removeRoute = ['ForgotPasswordStack']
  } else {
 //   console.log(' Drawer User not found ===='); 
    // if (!signedIn)
    //  console.log(' Drawer SignedIN  ====', signedIn);
    removeRoute = ['HomeDataStack', 'LogoutStack','ForgotPasswordStack']
  // }
}

   const gotoLogout = () => {
  //  console.log(' Here Logout Called from drawer-----------------')
     dispatch(logout())
     removeRoute = ["Home", 'HomeDataStack', 'LogoutStack', 'LogoutStack', 'Logout', 'ForgotPasswordStack'] 
     props.navigation.navigate("Home")
    return true;
    }
  return (
    <DrawerContentScrollView {...props} >
      {  
        
        (routes.filter(route => (route.showInDrawer 
          && (removeRoute.indexOf(route.name) === -1) ))
          .map((route) => {
            const focusedRoute = routes.find(r => (r.name === currentRouteName) )
            const focused = focusedRoute ?
              route.name === focusedRoute?.focusedRoute :
              route.name === screens.HomeStack
            return (              
              <DrawerItem 
                key={route.name}
                label={() => (
                  <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                    {route.title}
                      {/* {console.log('currentRouteName ==== ', currentRouteName, route.title)} */}
                  </Text>
                )}
                onPress={() => (route.name != 'LogoutStack' ?
                  props.navigation.navigate(route.name) : gotoLogout())}
                style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
              />           
            )
          })) 
      }
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = ({ nav }) => {
  
  return (
    
    <Drawer.Navigator 
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#551E18',
          height: 50,

        },
        
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) =>  <CustomDrawerContent {...props} nav={nav} />}
    >
      <Drawer.Screen name={screens.HomeTab} component={BottomTabNavigator} options={{
        title: 'Home',

        headerTitle: () => <Image source={require('../assets/images/mobile.png')} style={{ height: 42,width: 80}} />,
        headerRight: () => (
          <View style={styles.headerRight}>
            <Icon name="hourglass" size={20} color="#fff" />
          </View>
        ),
      }}/>
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})

export default DrawerNavigator
