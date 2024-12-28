import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {COLORS} from '../common/Constant/COLORS';

interface LoaderProps {
  visible: boolean; // Prop to control the visibility of the loader
  // Optional message to display below the loader
}

const Loader: React.FC<LoaderProps> = ({visible}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.theme} />
          {/* {message && <Text style={styles.message}>{message}</Text>} */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  loaderContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#fff', // White background for the loader
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 20,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.black, // Adjust according to your theme
  },
});

export default Loader;
