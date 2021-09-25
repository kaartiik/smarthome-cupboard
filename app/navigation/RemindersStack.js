import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ViewReminders from '../screens/Reminders';
import ViewReminder from '../screens/Reminders/ViewReminder';
import UpdateReminder from '../screens/Reminders/UpdateReminder';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarAdd from '../components/AppBarAdd';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function RemindersStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewReminders">
      <Stack.Screen
        name="ViewReminders"
        component={ViewReminders}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerRight: () => <AppBarAdd navigateTo="UpdateReminder" />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="ViewReminder"
        component={ViewReminder}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ reminderObject: null}}
      />
      <Stack.Screen
        name="UpdateReminder"
        component={UpdateReminder}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ reminderObject: null}}
      />
    </Stack.Navigator>
  );
}
