import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../Loader';

const SRC_WIDTH = Dimensions.get('window').width;
const CARD_LENGTH = SRC_WIDTH * 0.85;
const SPACING = SRC_WIDTH * 0.005;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.1) / 3;

const avatarPlaceholderImg = require('../../asserts/Images/ann3.jpeg');

interface ImageItem {
  id: string;
  image: string;
}

interface Carousel2Props {
  ImageData: ImageItem[];
}

interface ItemProps {
  index: number;
  scrollX: Animated.Value;
  imageSource: any;
  navigation: any;
}

interface ADOrgID {
  id: string;
}

interface ApiDataItem {
  id: number;
  AD_Org_ID: ADOrgID;
  ImageURL: string | null;
}

interface FormattedData {
  id: number;
  image: {uri: string};
}

function Item({index, scrollX, imageSource, navigation}: ItemProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    // console.log('Fallback to placeholder');
    setImageError(true);
  };

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index === 3 ? SIDECARD_LENGTH : SPACING,
          opacity,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          console.log('Navigating with TSX:', imageSource.image);
          console.log('Navigating with params: TSX', {
            imageUrl: imageSource.image,
            broadcastMessage: imageSource.message,
            id: imageSource.id,
            Expiration: imageSource.Expiration,
          });
          navigation.navigate('AdvertisementSrn', {
            imageUrl: imageSource.image,
            broadcastMessage: imageSource.message,
            id: imageSource.id,
            Expiration: imageSource.Expiration,
          });
        }}>
        <Image
          source={
            imageError ? avatarPlaceholderImg : {uri: imageSource.image.uri}
          }
          onError={handleImageError}
          style={{width: '100%', height: '100%', borderRadius: 30}}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

// Define the type for the FlatList reference
type FlatListRefType = FlatList<FormattedData> | null;

const Carousel2 = () => {
  const [popUpImage, setPopUpImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [scrollX] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [DATA, setDATA] = useState<FormattedData[]>([]);
  const flatListRef = useRef(null);
  const INTERVAL = CARD_LENGTH; // Snap to full screen width
  const AUTO_SCROLL_TIME = 3000; // 3 seconds interval

  // ALL Filter APPLIED
  const imageGetAPI = async () => {
    const protocol = await AsyncStorage.getItem('protocol');
    const host = await AsyncStorage.getItem('host');
    const port = await AsyncStorage.getItem('port');
    const token = await AsyncStorage.getItem('token');
    const organizationID = await AsyncStorage.getItem('organizationId');
    console.log('Organization ID:', organizationID);

    try {
      setIsLoading(true);
      const URL = `${protocol}://${host}:${port}/api/v1/models/AD_BroadcastMessage`;
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const apiData = response?.data?.records || [];

      const formattedData = apiData
        .filter((item: any) => {
          const orgId = item.AD_Org_ID?.id;
          // console.log(orgId,'orgId')
          const orgIdString = orgId ? orgId.toString() : '';
          // console.log(orgIdString,'orgIdString')
          const organizationIDString = organizationID
            ? organizationID.toString()
            : '';
          // console.log(organizationIDString,'organizationIDString')

          const expirationDate = item.Expiration
            ? new Date(item.Expiration)
            : null;

          const currentDate = new Date();

          return (
            (orgIdString === organizationIDString || orgIdString === '0') &&
            item.IsActive === true &&
            item.IsPublished === true &&
            item.Expired === false &&
            (expirationDate == null || expirationDate >= currentDate)
          );
        })
        .map((item: any) => {
          // console.log("Mapping item...");
          const imageUri = item.ImageURL
            ? {uri: item.ImageURL}
            : require('../../asserts/Images/ann4.jpeg');

          // Check if BroadcastFrequency.id is 'A'
          // PopUp function
          if (item.BroadcastFrequency.id === 'A') {
            setPopUpImage(item.ImageURL);
            setShowPopup(true);
          }

          return {
            id: item.id,
            image: imageUri,
            message: item.BroadcastMessage,
            imageUrl: item.ImageURL,
            Expiration: item.Expiration,
          };
        });

      setDATA(formattedData);
    } catch (error) {
      console.error('Error in imageGetAPI:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    imageGetAPI();
  }, []);

  // Auto Scroll Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < DATA.length) {
        flatListRef.current?.scrollToOffset({
          offset: index * INTERVAL,
          animated: true,
        });
        index++;
      } else {
        index = 0;
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      }
    }, AUTO_SCROLL_TIME);

    return () => clearInterval(interval);
  }, [DATA]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={CARD_LENGTH + SPACING * 7.1}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment="center"
        data={DATA}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Item
            index={index}
            scrollX={scrollX}
            imageSource={item}
            navigation={navigation}
          />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      <View style={styles.dotContainer}>
        {DATA.map((_, i) => {
          const dotSize = scrollX.interpolate({
            inputRange: [
              (i - 1) * (CARD_LENGTH + SPACING),
              i * (CARD_LENGTH + SPACING),
              (i + 1) * (CARD_LENGTH + SPACING),
            ],
            outputRange: [8, 12, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i.toString()}
              style={[styles.dot, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
      {isLoading ? <Loader /> : null}

      {/* Popup Modal */}
      <Modal
        visible={showPopup}
        transparent={true}
        onRequestClose={() => setShowPopup(false)}>
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{uri: popUpImage}}
                style={{width: '100%', height: '100%', borderRadius: 20}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: 125,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'gray',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#6282AA',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: SRC_WIDTH * 0.8,
    height: SRC_WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default Carousel2;
