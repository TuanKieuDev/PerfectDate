import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverStack from './DiscoverStack'
import PersonalStack from './PersonalStack'
import FavouriteStack from './FavouriteStack'
import StylesShare from '../config/styles';
import Icon from 'react-native-vector-icons/FontAwesome5'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: StylesShare.app,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        
      }}
      tabBarOptions={{showLabel:false}}
      >
        <Tab.Screen 
        name="DiscoverStack" 
        component={DiscoverStack}
        options={{
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name='search' size={25} color={color}/>;
            },
            headerShown: false,
          }}
        />
        <Tab.Screen 
        name="FavouriteStack" 
        component={FavouriteStack}
        options={{
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name='heartbeat' size={25} color={color}/>;
            },
            headerShown: false,
          }}
        />
        <Tab.Screen 
        name="PersonalStack" 
        component={PersonalStack}
        options={{
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name='user-circle' size={25} color={color}/>;
            },
            headerShown: false
          }}
        />
      </Tab.Navigator>
  );
}