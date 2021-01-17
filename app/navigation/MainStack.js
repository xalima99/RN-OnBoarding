import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {OnBoarding} from '../screens';
const Stack = createStackNavigator();

const mainstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="onBoarding" component={OnBoarding} />
    </Stack.Navigator>
  );
};

export default mainstack;
