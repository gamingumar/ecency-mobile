import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';

interface AutoHeightImageProps {
  contentWidth: number;
  imgUrl: string;
  metadata: any;
  isAnchored: boolean;
  activeOpacity?: number;
  onPress: () => void;
}

export const AutoHeightImage = ({
  contentWidth,
  imgUrl,
  metadata,
  isAnchored,
  activeOpacity,
  onPress,
}: AutoHeightImageProps) => {
  const [imgWidth, setImgWidth] = useState(contentWidth);
  const [imgHeight, setImgHeight] = useState(imgWidth * (9 / 16));
  const [onLoadCalled, setOnLoadCalled] = useState(false);

  useEffect(() => {
    _fetchImageBounds();
  }, []);

  const _fetchImageBounds = () => {
    Image.getSize(imgUrl, (width, height) => {
      const newWidth = width < contentWidth ? width : contentWidth;
      const newHeight = (height / width) * newWidth;
      setImgHeight(newHeight);
      setImgWidth(newWidth);
    });
  };

  const imgStyle = {
    width: imgWidth - 10,
    height: imgHeight,
    backgroundColor: onLoadCalled ? 'transparent' : EStyleSheet.value('$primaryLightBackground'),
  };

  const _onLoad = () => {
    setOnLoadCalled(true);
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={isAnchored} activeOpacity={activeOpacity || 1}>
      <FastImage
        style={imgStyle}
        source={{ uri: imgUrl }}
        resizeMode={FastImage.resizeMode.contain}
        onLoad={_onLoad}
      />
    </TouchableOpacity>
  );
};
