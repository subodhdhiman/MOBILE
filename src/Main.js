import React, {createRef, useContext, useEffect, useState} from 'react';
import {
  NavigationContainer,
  NativeBaseProvider,
} from '@react-navigation/native';

import {Text, View, Box, Button, ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';

import KeyboardAvoidingWrapper from './global/KeyboardAvoidingWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ErrorNotification from './common/ErrorNotification'

// import {AuthContext,useAuthContext} from './context/AuthProvider';
import DrawerNavigator from './navigation/DrawerNavigator'
import {isBuffer} from 'lodash';


AntDesign.loadFont().then();
Feather.loadFont().then();
MaterialIcons.loadFont().then();

const navigationRef = createRef()
const nav = () => navigationRef.current

export default function Main({children}) {
 
  return (
    
     <SafeAreaView style={{
        flex: 1,
      overflow: 'hidden',
       
      }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <ErrorNotification>
          <DrawerNavigator nav={nav} />
         </ErrorNotification>
      </NavigationContainer>
    </SafeAreaView>

    
  );
}
