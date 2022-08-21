import React, { memo } from 'react';
import Background from './Background';
import Logo from './Logo';
import Header from './Header';
import Paragraph from './Paragraph';
import Button from './Button';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

const Question = (props) => {
  return (
    
    <View> 
      <View>
      <Text>
        {props.question}
      </Text>

    </View>

    <FlatList
        style={styles.questionOptions}
        data={props.options}
        contentContainerStyle={styles.questionOptionsContainer}
        renderItem={({ item }) => (
          <Button mode="outlined" onPress={() => props.onItemSelected(item)}>
            {item}
          </Button>
        )}
        keyExtractor={(item, index) => `${index}-${item}`}
        onPressItem={props.onItemSelected}
        scrollEnabled={true}
      />
  </View>
  )
};

const styles = StyleSheet.create({
  questionOptions: {
    width: '100%',
  },
  questionOptionsContainer: {
    marginTop: 0,
  }
});

export default memo(Question);