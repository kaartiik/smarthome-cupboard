import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import colours from '../providers/constants/colours';
import RecordsStack from './RecordsStack';
import HomeStack from './HomeStack';
import SitesStack from './SitesStack';
import UsersStack from './UsersStack';
import * as ROLES from '../providers/constants/roles';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { role } = useSelector((state) => ({
    role: state.userReducer.role,
  }));

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Records') {
            iconName = 'ios-list';
          } else if (route.name === 'Sites') {
            iconName = 'ios-business';
          } else if (route.name === 'Users') {
            iconName = 'ios-people';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colours.themeSecondary,
        inactiveTintColor: colours.themePrimary,
        keyboardHidesTabBar: true,
        // showLabel:  false
      }}
    >
      {role === ROLES.RECORDER && (
        <Tab.Screen name="Home" component={HomeStack} />
      )}
      <Tab.Screen name="Records" component={RecordsStack} />
      {role === ROLES.ADMIN && (
        <>
          <Tab.Screen name="Sites" component={SitesStack} />
          <Tab.Screen name="Users" component={UsersStack} />
        </>
      )}
    </Tab.Navigator>
  );
}
