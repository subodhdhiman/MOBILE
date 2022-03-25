import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, StyleSheet, View } from 'react-native'

import HomeStackNavigator from './stack-navigators/HomeStackNavigator'
import HomeDataStackNavigator from './stack-navigators/HomeDataStackNavigator'

import BookStackNavigator from './stack-navigators/BookStackNavigator'
import ContactStackNavigator from './stack-navigators/ContactStackNavigator'


import LogoutStackNavigator from './stack-navigators/LogoutStackNavigator'
import LoginStackNavigator from '../pages/Auth/Screens/LoginStackNavigator'
import RegisterStackNavigator from '../pages/Auth/Screens/RegisterStackNavigator'
import ForgotPasswordStackNavigator from '../pages/Auth/Screens/ForgotPasswordStackNavigator'

import DashboardStackNavigator from '../pages/Calls/Screens/DashboardStackNavigator'
// import RegisterStackNavigator from './stack-navigators/RegisterStackNavigator'



import { routes, screens } from './RouteItems'

const Tab = createBottomTabNavigator()

const tabOptions = ({ route }) => {
  const item = routes.find(routeItem => routeItem.name === route.name)

  // console.log(' Vikas :: item ', item.name)
  
  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{ width: 0 }} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
      tabBarHideOnKeyboard: true
    }
  }

  return {
    tabBarIcon: ({ focused }) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{item.title || ''}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  }
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name={screens.HomeStack} component={HomeStackNavigator} />
      <Tab.Screen name={screens.BookStack} component={BookStackNavigator} />
      <Tab.Screen name={screens.ContactStack} component={ContactStackNavigator} />

  
     
      <Tab.Screen name={screens.LogoutStack} component={LogoutStackNavigator} />
      <Tab.Screen name={screens.LoginStack} component={LoginStackNavigator} />
      <Tab.Screen name={screens.RegisterStack} component={RegisterStackNavigator} />
      <Tab.Screen name={screens.HomeDataStack} component={HomeDataStackNavigator} />
      <Tab.Screen name={screens.ForgotPasswordStack} component={ForgotPasswordStackNavigator} />
      <Tab.Screen name={screens.DashboardStack} component={DashboardStackNavigator} />
    
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  tabContainer: {
    height: 60,
  }
})

export default BottomTabNavigator
