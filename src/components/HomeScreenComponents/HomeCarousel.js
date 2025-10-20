// import React from 'react'
// import { View, Image, StatusBar, Dimensions,StyleSheet } from 'react-native'
// import Swiper from 'react-native-swiper'
// const { width, height } = Dimensions.get('window')

// const HomeCarousel = () => {
//     return (
//         <View style={styles.containerAdjustment}>
//         <View style={styles.container}>
//           <StatusBar barStyle="light-content" />
//           <Swiper
//             style={styles.wrapper}
//             dot={
//               <View
//                 style={{
//                 //   backgroundColor: 'rgba(255,255,255,.3)',
//                 backgroundColor:'#E8E8E8',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 7,
//                   marginLeft: 5, 
//                   marginRight: 5,
//                 }}
//               />
//             }
//             activeDot={
//               <View
//                 style={{
//                   backgroundColor: '#16a4dd',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 7,
//                   marginLeft: 5,
//                   marginRight: 5
//                 }}
//               />
//             }
//             paginationStyle={{
//               bottom: -10
//             }}
//             loop={false}
//           >
//             <View style={styles.slide}>
//               <Image
//                 style={styles.image}
//                 source={require('../../Assets/Images/carousel1.png')}
//                 resizeMode="cover"
//               />
//             </View>
//             <View style={styles.slide}>
//               <Image
//                 style={styles.image}
//                 source={require('../../Assets/Images/carausel2.png')}
//                 resizeMode="cover"
//               />
//             </View>
//             <View style={styles.slide}>
//               <Image style={[styles.image,{width:480}]} source={require('../../Assets/Images/carosuel3.png')} />
//             </View>
//           </Swiper>
//         </View>
//         </View>
//       )
// }

// export default HomeCarousel

// const styles = StyleSheet.create({
  
//     slide: {
//        alignItems:'center',
//     },
//     container: {
//     height:145,
//     width:350,
//     // backgroundColor:'blue',
//     },
//     containerAdjustment:{
//         justifyContent:'center',
//         alignItems:'center',
//         marginTop:5
//     },
  
//     image: {
//       width:350,
//       height:140,
//       borderRadius:25,
//       alignItems:'center',
//       justifyContent:'center'
//     }
//   })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeCarousel = () => {
  return (
    <View>
      <Text>HomeCarousel</Text>
    </View>
  )
}

export default HomeCarousel

const styles = StyleSheet.create({})