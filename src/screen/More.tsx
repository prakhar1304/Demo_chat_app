import {StyleSheet, Text, View, Share, TouchableOpacity} from 'react-native';
import React from 'react';

import {Image} from 'react-native-elements';
import color from '../common/color';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const More = () => {
  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out Thodi Baat - A new chat app coming soon!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>What is </Text>
        <Text style={styles.thodiBaatText}>This App for?</Text>
      </View>

      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}

      <Text style={styles.description}>
        A chat app beta version. Stay tuned for more exciting features coming
        soon!
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(22),
  },
  titleText: {
    fontSize: moderateScale(27),
    color: color.BLACK,
    fontWeight: 'bold',
  },
  thodiBaatText: {
    fontSize: moderateScale(30),
    color: '#007AFF',
    fontWeight: 'bold',
  },
  logo: {
    height: scale(120),
    width: scale(120),
    marginVertical: verticalScale(20),
  },
  description: {
    fontSize: moderateScale(16),
    color: color.BLACK,
    textAlign: 'center',
    marginVertical: verticalScale(20),
    lineHeight: verticalScale(24),
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    marginTop: verticalScale(20),
  },
  shareButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
