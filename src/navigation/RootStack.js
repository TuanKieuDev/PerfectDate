import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import MainTab from './MainTab';
import Onboarding from '../screens/Onboarding';
import Splash from '../screens/SplashScreen'


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="Onboarding" component={Onboarding}/>      
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={Register} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;