import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePassword from '../screens/ChangePassword';
import Personal from '../screens/Personal';
import HistoryDating from '../screens/HistoryDating'

const Stack = createNativeStackNavigator();

function PersonalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{headerTitle: 'Tài khoản'}}
      />
      <Stack.Screen
        name="HistoryDating"
        component={HistoryDating}
        options={{
          headerTitle: 'Lịch sử hẹn hò',
          headerBackTitle: ''
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: 'Đổi mật khẩu',
          headerBackTitle: ''
        }}
      />
      
    </Stack.Navigator>
  );
}

export default PersonalStack;
