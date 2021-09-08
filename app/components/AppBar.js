import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Header } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import colours from '../providers/constants/colours';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,
    height: Header.height,

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

const AppBar = () => {
  const dispatch = useDispatch();

  const { isAdmin } = useSelector((state) => ({
    isAdmin: state.userReducer.isAdmin,
  }));

  return (
    <View style={styles.headerContainer}>
      <Image
        // eslint-disable-next-line global-require
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={{
          marginTop: 10,
          height: 40,
          width: 40,
        }}
      />
    </View>
  );
};

export default AppBar;
