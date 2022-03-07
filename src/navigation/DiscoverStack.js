import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from '../screens/Discover'
import DiscoverDetail from '../screens/DiscoverDetail'
import Checkout from '../screens/Checkout'



const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="DiscoverDetail" component={DiscoverDetail} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
  );
}

export default DiscoverStack;