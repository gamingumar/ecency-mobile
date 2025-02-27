import React from 'react';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';

import { useSelector } from 'react-redux';

import styles from './postCardPlaceHolderStyles';
// TODO: make container for place holder wrapper after alpha
const PostCardPlaceHolder = () => {
  const isDarkTheme = useSelector((state) => state.application.isDarkTheme)
  const color = isDarkTheme ? '#2e3d51' : '#f5f5f5';
  return (
    <View style={styles.container}>
      <View style={styles.paragraphWrapper}>
        <Placeholder.Paragraph
          lineNumber={4}
          color={color}
          textSize={16}
          lineSpacing={5}
          width="100%"
          lastLineWidth="70%"
          firstLineWidth="20%"
          animate="fade"
        />
      </View>
    </View>
  );

};
export default PostCardPlaceHolder;
