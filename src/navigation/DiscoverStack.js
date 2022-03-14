import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from '../screens/Discover';
import DiscoverDetail from '../screens/DiscoverDetail';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

function DiscoverStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DiscoverDetail"
        component={DiscoverDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerTitle: '', headerBackTitle: ''}}
      />
    </Stack.Navigator>
  );
}

export default DiscoverStack;
