import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourite from '../screens/Favourite'
import DiscoverDetail from '../screens/DiscoverDetail';


const Stack = createNativeStackNavigator();

function FavouriteStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Favourite" component={Favourite} options={{headerTitle:'Yêu thích'}}/>
        <Stack.Screen name="DiscoverDetail" component={DiscoverDetail} options={{headerShown:false}}/>
      </Stack.Navigator>
  );
}

export default FavouriteStack;