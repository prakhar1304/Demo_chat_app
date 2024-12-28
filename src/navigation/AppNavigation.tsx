import * as React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabBar} from '@react-navigation/bottom-tabs';
import BottomTabNavigation from './BottomTabNavigation';

import ChatScreen from '../screen/ChatScreen';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
