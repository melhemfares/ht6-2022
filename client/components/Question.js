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
        renderItem={({ item, index }) => (
          <Button mode="outlined" disabled={props.status != "progress"} buttonColor={(props.lastSelected == index && props.status == "incorrect") ? "#ff0000" : ((props.lastSelected == index && props.status == "correct") ? "#66ff33" : "#dcdcdc")} onPress={() => props.onItemSelected(item, index)}>
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