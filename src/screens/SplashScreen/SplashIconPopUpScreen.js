import {Animated, BackHandler, Image, StatusBar, StyleSheet, View, Easing } from 'react-native';
import React, {useEffect, useRef} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../../asserts/SvgImages/Home.svg';


const SplashIconPopUpScreen = ({navigation}) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      duration: 100,
      delay: 400,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start(() => {
      navigation.navigate('WelcomeScreen');
    });
  }, [scale, navigation]);

  return (
    <View style={styles.container}>
         <StatusBar translucent={true} backgroundColor="#1BBC9B" />
      <Animated.View
        style={{
          transform: [
            {
              scale: scale.interpolate({
                inputRange: [-1, 1],
                outputRange: [0, 2.8],
              }),
            },
          ],
        }}>
        
        {/* <SplashSceondSrnicon width={100} height={100}/> */}
        
          {/* <Home width={100} height={100} /> */}
          <Home  width={100} height={100} fill={"#FFFFFF"} />
       
        
      </Animated.View>
      
       
     
      
    </View>
  );
};

export default SplashIconPopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1BBC9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});





