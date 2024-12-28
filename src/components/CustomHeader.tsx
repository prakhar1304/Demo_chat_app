import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../common/Icon';
import color from '../common/color';
import {FONTS} from '../common/Constant/FONTS';
import {COLORS} from '../common/Constant/COLORS';
import LinearGradient from 'react-native-linear-gradient';
// Ensure you have this package installed

interface CustomHeaderProps {
  title: string;
  onBackPress: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({title, onBackPress}) => {
  return (
    <LinearGradient
      colors={[COLORS.GRADIENT_ONE, COLORS.theme]}
      style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
        <Icon type={'AntDesign'} name="left" size={24} color={COLORS.theme} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon type={'Ionicons'} name="call" size={24} color={COLORS.theme} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            type={'FontAwesome'}
            name="video-camera"
            size={24}
            color={COLORS.theme}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    elevation: 3,
    // For Android shadow
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    color: color.WHITE,
    position: 'absolute',
    left: 70,
    fontFamily: FONTS.title,
    // bottom: 2,
    paddingHorizontal: 10,
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default CustomHeader;
