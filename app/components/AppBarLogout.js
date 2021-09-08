import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import colours from '../providers/constants/colours';
import { logout } from '../providers/actions/User';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,

    backgroundColor: colours.themePrimary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppBarLogout = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}
      onPress={() => dispatch(logout())}
    >
      <Ionicons name="ios-exit" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default AppBarLogout;
