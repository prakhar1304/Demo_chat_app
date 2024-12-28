import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import ContactsScreen from '../screen/ContactsScreen';

import More from '../screen/More';
import Icon from '../common/Icon';
import color from '../common/color';
import {FONTS} from '../common/Constant/FONTS';
import {COLORS} from '../common/Constant/COLORS';

import ChatScreen from '../screen/ChatScreen';
import ChatList from '../screen/ChatList';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Contact"
          component={ContactsScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.PopContainer}>
                {focused ? (
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Contacts</Text>
                    <View style={styles.indicator} />
                  </View>
                ) : (
                  <Icon
                    type={'Ionicons'}
                    name="people-outline"
                    size={moderateScale(26)}
                    color={COLORS.fontColor}
                  />
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ChatList"
          component={ChatList}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.PopContainer}>
                {focused ? (
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Chats</Text>
                    <View style={styles.indicator} />
                  </View>
                ) : (
                  <Icon
                    type={'Ionicons'}
                    name="chatbubble-outline"
                    size={moderateScale(26)}
                    color={COLORS.fontColor}
                  />
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.PopContainer}>
                {focused ? (
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>More</Text>
                    <View style={styles.indicator} />
                  </View>
                ) : (
                  <Icon
                    type={'Entypo'}
                    name="dots-three-horizontal"
                    size={moderateScale(25)}
                    color={COLORS.fontColor}
                  />
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    height: verticalScale(55),
    position: 'absolute',
    backgroundColor: '#fffffa',
    elevation: 4,
    borderTopWidth: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
  },
  PopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  labelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: moderateScale(14),
    color: COLORS.fontColor,
    fontWeight: '600',
    fontFamily: FONTS.LatoBold,
    marginBottom: verticalScale(5),
  },
  indicator: {
    marginTop: verticalScale(2),
    width: scale(4),
    height: verticalScale(4),
    backgroundColor: COLORS.fontColor,
    borderRadius: scale(3),
  },
});

export default BottomTabNavigation;
