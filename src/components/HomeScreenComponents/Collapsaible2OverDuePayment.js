import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Collapsaible2OverDuePayment = ({ FormNoDuePayment,
  AmountNoDuePayment,
  DateForDuePayment,
  ProjectNameDuePayment }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [headerColor, setHeaderColor] = useState('#F2FDF6');
  const [textColor, setTextColor] = useState('#000');
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setHeaderColor(collapsed ? '#157B63' : '#F2FDF6');
    setTextColor(collapsed ? '#fff' : '#000');

    Animated.timing(rotateAnim, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    // <View>
    //   <TouchableOpacity onPress={toggleExpanded}>
    //     <View style={[styles.collapsaible, { backgroundColor: headerColor }]}>
    //       <View
    //         style={styles.GreenContainer}>
    //         <Ionicons name="cash-outline" size={30} color={'#0A4A25'} />
    //       </View>
    //       <Text style={{ color: textColor, fontWeight: '800', marginLeft: 5 }}>
    //         Over Due Payments
    //       </Text>

    //       <Animated.View
    //         style={{
    //           marginLeft: 120,
    //           transform: [{ rotate }],
    //         }}>
    //         <AntDesign name="down" size={15} color={'#000'} />
    //       </Animated.View>
    //     </View>
    //   </TouchableOpacity>
    //   <Collapsible collapsed={collapsed} style={{ alignItems: 'center', }}>
    //     <View style={styles.RevealingView}>
    //       <View style={styles.APIResponseContainer}>
    //         <View style={{ flexDirection: "row", width: "45%" }}>
    //           <Text style={styles.HeadingTextStyle}>
    //             Form No:
    //           </Text>
    //           <Text style={styles.TextStyle}>{FormNo}</Text>
    //         </View>
    //         <View style={{ flexDirection: "row", width: "45%" }}>
    //           <Text style={styles.HeadingTextStyle}>
    //             Amount:
    //           </Text>
    //           <Text style={{ fontSize: 12, color: 'blue' }}>{Amount}</Text>
    //         </View>
    //       </View>

    //       <View style={[styles.APIResponseContainer, { marginTop: 5, }]}
    //       >
    //         <View style={{ flexDirection: "row", width: "45%" }}>
    //           <Text style={styles.HeadingTextStyle}>
    //             Project:
    //           </Text>
    //           <Text style={styles.TextStyle}> {ProjectName}</Text>
    //         </View>
    //         <View style={{ flexDirection: "row", width: "45%" }}>
    //           <Text style={styles.HeadingTextStyle}>
    //             Over Due Date:
    //           </Text>
    //           <Text style={styles.TextStyle}>{overDueDate}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </Collapsible>
    // </View>

    <View style={styles.RevealingView}>
      <View style={styles.APIResponseContainer}>
        <View style={{ flexDirection: "row", width: "45%" }}>
          <Text style={styles.HeadingTextStyle}>Form No:</Text>
          <Text style={styles.TextStyle}>{FormNoDuePayment}</Text>
        </View>
        <View style={{ flexDirection: "row", width: "45%" }}>
          <Text style={styles.HeadingTextStyle}>Amount:</Text>
          <Text style={styles.TextStyle}>{AmountNoDuePayment}</Text>
        </View>
      </View>
      <View style={[styles.APIResponseContainer, { marginTop: '2%' }]}>
        <View style={{ flexDirection: "row", width: "45%" }}>
          <Text style={styles.HeadingTextStyle}>Project:</Text>
          <Text style={styles.TextStyle}>{ProjectNameDuePayment}</Text>
        </View>
        <View style={{ flexDirection: "row", width: "45%" }}>
          <Text style={styles.HeadingTextStyle}> Over Due Date:</Text>
          <Text style={[styles.TextStyle,{marginTop:"-8%"}]}>{DateForDuePayment}</Text>
        </View>
      </View>
    </View>
  );
};

export default Collapsaible2OverDuePayment;

const styles = StyleSheet.create({
  collapsaible: {
    // height: 50,
    // width: '100%',
    // backgroundColor: '#157B63',
    // borderLeftWidth: 5,
    // // borderLeftColor: '#0A4A25',
    // // borderLeftColor: '#0A4A25',
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginTop: 5,

    height: 50,
    width: '100%',
    backgroundColor: '#F2FDF6',
    borderLeftWidth: 5,
    borderLeftColor: '#0A4A25',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#157B63',
    marginTop: 5


  },
  GreenContainer: {
    height: 35,
    width: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  RevealingView: {
    height: 90,
    width: '97%',
    backgroundColor: '#fafafa',
    marginTop: 5,
    borderRadius: 10,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 5,
  },
  ArrowIcon: {
    height: 25,
    width: 45,
    backgroundColor: '#3d46f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  HeadingTextStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  TextStyle: {
    fontSize: 12,
    // color: '#cccccc',
    color:"#000",
    textAlignVertical: "center",
    paddingLeft: 4,
    fontWeight: "400",
  },
  APIResponseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "90%",
    alignSelf: "center",
  }
});
