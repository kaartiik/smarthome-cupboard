import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import colours from '../providers/constants/colours';
import Home from '../screens/Home';
import ClockInRecords from '../screens/ClockInRecords';
import ScannerStack from './ScannerStack';

// import { AuthContext } from './AuthProvider';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // const { isAuthorized, isAdmin } = useContext(AuthContext);

  const { isAdmin } = useSelector((state) => ({
    isAdmin: state.userReducer.isAdmin,
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
          }
          //else if (route.name === 'Recipes') {
          //   iconName = 'ios-list';
          // } else if (route.name === 'Comments') {
          //   iconName = 'ios-mail';
          // } else if (route.name === 'Contact Us') {
          //   iconName = 'ios-information';
          // }

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Records" component={ClockInRecords} />
      {/* <Tab.Screen name="Recipes" component={AllRecipes} />
      {isAdmin ? (
        <>
          <Tab.Screen name="Upload" component={UploadRecipe} />
          <Tab.Screen name="Comments" component={AllComments} />
        </>
      ) : (
        <Tab.Screen name="Contact Us" component={SubmitComments} />
      )} */}
    </Tab.Navigator>
  );
}
