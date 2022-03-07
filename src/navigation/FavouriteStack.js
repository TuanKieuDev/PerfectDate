import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourite from '../screens/Favourite'
import DiscoverDetail from '../screens/DiscoverDetail';


const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="DiscoverDetail" component={DiscoverDetail} />
      </Stack.Navigator>
  );
}

export default DiscoverStack;