// import {StyleSheet, View} from 'react-native';
// import React from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import AllTaskScreen from '../../screens/AllTaskScreen/AllTaskScreen';
// import CloseStatusTricket from '../../screens/AllTaskScreen/CloseStatusTricket';
// import CustomHeader from '../../components/CustomHeader';
// import ProjectName from '../../screens/PropertyLeadgerScreens/ProjectName';

// const TapTab = createMaterialTopTabNavigator();

// const TopTabWithHeader = () => {
//   return (
//     <View style={{flex: 1}}>
//       {/* Custom Header */}
//       <CustomHeader
//         title="My Tickets"
//         RightIcon="filter-variant"
//         RightPress={() => {
//           // Add functionality for filter button
//         }}
//       />

//       {/* TopTab Navigator */}
//       <TapTab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: {fontSize: 14},
//           tabBarIndicatorStyle: {backgroundColor: '#000'},
//           tabBarStyle: {
//             backgroundColor: '#f9f9f9',
//             elevation: 2,
//           },
//         }}>
//         <TapTab.Screen name="Open" component={AllTaskScreen} />
//         <TapTab.Screen name="Close" component={CloseStatusTricket} />
//       </TapTab.Navigator>
//     </View>
//   );
// };

// export default TopTabWithHeader;

// const styles = StyleSheet.create({
//   Header: {
//     backgroundColor: '#0050C0',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
// });
