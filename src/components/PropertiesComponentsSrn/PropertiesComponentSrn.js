import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width: screenWidth} = Dimensions.get('window');

const PropertiesComponentSrn = ({
  Property_Unit_Name,
  Project_Name,
  Props_Type,
  Form_No,
  Property_Size,
  Floor,
  Issue_Date,
  Amount,
  Currency_Name,
  onPress,
}) => {
  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity
        style={{padding: 5, backgroundColor: '#E9F4F6'}}
        onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.ImageContainer}>
            <Image
              style={styles.ImageStyle}
              source={require('../../asserts/PropertieSrnFakePic/PropertieImage.jpg')}
            />
          </View>
          <View style={styles.ImagekSathWalaContainer}>
            <Text style={[styles.TitleTxt, {width: '100%'}]}>
              {Property_Unit_Name}
            </Text>
            <Text style={{color: 'gray', fontSize: 13}}>{Project_Name}</Text>

            {/* <View style={[styles.ButtonStyle,{backgroundColor:"red"}]}>
                            <Text style={styles.ButtonTxtStyle}>{Props_Type}</Text>
                        </View> */}
            <View style={[styles.ButtonStyle, {flexDirection: 'row'}]}>
              {Props_Type === 'Residential' ? (
                <AntDesign name="home" size={16} color="white" />
              ) : Props_Type === 'Commercial' ? (
                <FontAwesome5 name="building" size={16} color="white" />
              ) : null}
              <Text style={[styles.ButtonTxtStyle, {paddingLeft: '3%'}]}>
                {Props_Type}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={[styles.BottomInner, {padding: 5}]}>
            <View style={styles.CardView}>
              <Text style={styles.TitleTxt}>Form No</Text>
              <Text style={styles.bottomTxt}>{Form_No}</Text>
            </View>
            <View style={[styles.CardView]}>
              <Text style={styles.TitleTxt}>Floor:</Text>
              <Text style={styles.bottomTxt}>{Floor}</Text>
            </View>
            <View style={styles.CardView}>
              <Text style={[styles.TitleTxt, {width: '38%'}]}>Amount:</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.PKRTextStyle}> {Currency_Name}</Text>
                <Text style={styles.PKRTextStyle}>
                  {' '}
                  {Number(Amount).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.BottomInner, {padding: 5}]}>
            {/* <View style={styles.CardView}>
                            <Text style={[styles.TitleTxt, { width: "60%" }]}>Property Size:</Text>
                            <Text style={styles.bottomTxt}>{Property_Size}Sqrf</Text>
                        </View> */}
            <View style={styles.CardView}>
              <Text style={[styles.TitleTxt, {width: '60%'}]}>
                Property Size:
              </Text>
              <Text style={styles.bottomTxt}>{`${Property_Size} Sqft²`}</Text>
            </View>
            <View style={styles.CardView}>
              <Text style={[styles.TitleTxt, {width: '50%'}]}>Issue Date:</Text>
              <Text style={styles.bottomTxt}>{Issue_Date}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.CornerView}></View>
    </View>
  );
};

export default PropertiesComponentSrn;

const styles = StyleSheet.create({
  ImageContainer: {
    // padding: 5,
    width: '50%',
  },
  ImageStyle: {
    width: '95%',
    height: screenWidth * 0.2,
    borderRadius: 10,
    // height: "70%"
  },
  MainContainer: {
    // backgroundColor: "#F6FFFD",
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    overflow: 'hidden',
  },
  ImagekSathWalaContainer: {
    width: '50%',
    paddingHorizontal: 10,
  },
  HeadingStyle: {
    color: 'black',
    fontSize: 16,
  },
  ButtonStyle: {
    // marginTop: 7,
    width: '67%',
    padding: 7,
    // backgroundColor: '#D3AFCB',
    backgroundColor: '#000',
    // backgroundColor: 'rgba(155,65,136,39)',
    // backgroundColor: '#5C8F97',
    borderRadius: 5,
    // borderColor: '#9B4188',
    borderWidth: 1.5,
  },
  CornerView: {
    position: 'absolute',
    bottom: -70,
    right: 0,
    width: 50,
    height: 110,
    // backgroundColor: '#DEF9E9',
    // backgroundColor: '#568086',
    backgroundColor: '#82CED9',
    transform: [{rotate: '55deg'}],
    borderTopLeftRadius: 8,
  },
  Container50Styles: {
    flexDirection: 'row',
    padding: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5,
  },
  BottomInner: {
    width: '50%',
  },
  CardView: {
    flexDirection: 'row',
  },
  TitleTxt: {
    fontWeight: 'bold',
    color: '#000',
    width: '40%',
    paddingVertical: 3,
  },
  bottomTxt: {
    color: 'gray',
    width: '60%',
    paddingVertical: 3,
  },
  PKRTextStyle: {
    fontWeight: 'bold',
    // color: '#156CFF',
    color: '#c1a51a',
  },
  ButtonTxtStyle: {
    color: '#fff',

    textAlign: 'center',
  },
});
