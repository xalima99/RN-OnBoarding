import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  Image,
  Pressable,
} from 'react-native';
import styles from './styles';

import {COLORS, images, FONTS, SIZES} from '../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {onboarding1, onboarding2, onboarding3} = images;

//Dummy Data
const onboardings = [
  {
    title: "Let 's travel",
    desription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dignissimos molestiae',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    desription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dignissimos molestiae',
    img: onboarding2,
  },
  {
    title: 'Destination',
    desription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dignissimos molestiae',
    img: onboarding3,
  },
];

const Index = () => {
  const scrollX = new Animated.Value(0);

  const renderContent = () => {
    return (
      <Animated.ScrollView
        decelerationRate={0}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onboardings.map((item, index) => (
          <View key={index} style={styles.deck}>
            {/* image */}
            <View style={styles.imageContainer}>
              <Image source={item.img} style={styles.img} resizeMode="cover" />
            </View>
            {/* Text */}
            <View style={styles.Text}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.desription}</Text>
            </View>
            {/* Button */}
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPositions = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onboardings.map((item, index) => {
          const opacity = dotPositions.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSizes = dotPositions.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${index}`}
              style={[
                styles.dot,
                {width: dotSizes, height: dotSizes},
              ]}></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
      {/* <Pressable style={{position: 'absolute', top: '15%'}}>
        <Text>Skip</Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

export default Index;
