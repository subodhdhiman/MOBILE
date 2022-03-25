import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'

const Stack = createStackNavigator()

const Logout = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>MyLogout Screen</Text>
  </View>
)

const LogoutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Logout} component={Logout} />
    </Stack.Navigator>
  )
}

export default LogoutStackNavigator
