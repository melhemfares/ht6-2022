import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BackButton = (props) => (
  <TouchableOpacity onPress={props.goBack} style={styles.container}>
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);