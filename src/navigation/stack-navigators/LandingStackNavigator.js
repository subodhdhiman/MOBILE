import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'

const Stack = createStackNavigator()

const Dashboard = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard for User!</Text>
  </View>
)

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
