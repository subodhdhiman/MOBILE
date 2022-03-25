import React from 'react';
import {
  HStack,
  NativeBaseProvider,
  Icon,
  IconButton,
  Text,
  Box,
  StatusBar,
} from 'native-base';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const GlobalHeader = props => {
  return (
    <>
      <StatusBar backgroundColor="red" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#6200ee">
        <HStack
          bg="#6200ee"
          px="1"
          py="1"
          justifyContent="space-between"
          alignItems="center">
          <HStack space="4" alignItems="center">
            <IconButton
              icon={
                <Icon
                  size="sm"
                  as={<MatIcon name="account-circle" />}
                  color="white"
                />
              }
            />
            <Text color="white" fontSize="20" fontWeight="bold">
              Home Page
            </Text>
          </HStack>
          <HStack space="2" px="1" py="1">
            <IconButton
              icon={
                <Icon size="sm" as={<MatIcon name="search" />} color="white" />
              }
            />
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <GlobalHeader />
    </NativeBaseProvider>
  );
}