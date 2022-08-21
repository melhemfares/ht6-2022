import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../utils/theme.js';

const Header = (props) => (
  <Text style={styles.header}>{props.children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);