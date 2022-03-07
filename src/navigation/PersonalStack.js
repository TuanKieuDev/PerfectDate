import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../screens/ChangePassword'
import Personal from '../screens/Personal'



const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
  );
}

export default DiscoverStack;