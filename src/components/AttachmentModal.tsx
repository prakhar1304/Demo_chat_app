import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../common/Icon';
import { COLORS } from '../common/Constant/COLORS';
import { FONTS } from '../common/Constant/FONTS';
import { moderateScale } from 'react-native-size-matters';
import { Image } from 'react-native-elements';

interface AttachmentModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  visible,
  onClose,
  onOptionSelect,
}) => {
  const options = [
    { icon: 'camera', label: 'Camera', type: 'Ionicons' },
    { icon: 'image', label: 'Gallery', type: 'Ionicons' },
    { icon: 'document-text', label: 'Document', type: 'Ionicons' },
  
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
  
              <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => onOptionSelect(option.label)}
                  >
                    <View style={styles.iconContainer}>
                      <Icon
                        type={option.type}
                        name={option.icon}
                        size={24}
                        color={COLORS.white}
                      />
                    </View>
                
                  </TouchableOpacity>
                ))}
              </View>
             
            </View>
          </TouchableWithoutFeedback>
          <View style={{    
    width: 150,
    left:240,
    bottom:60,
    justifyContent: 'center',
    alignItems: 'center',margin:-10}}>
                <Image source={require("../assets/icon/down.png")}
                style={{height:25 , width:25 }}/>
              </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    
  },
  modalContent: {
    backgroundColor: COLORS.green,
    borderRadius:moderateScale(20),
    paddingBottom: moderateScale(20),
    height: 55,
    width: 150,
    left:230,
    bottom:60,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: moderateScale(10),
    justifyContent: 'space-around',
    
  },
  option: {
    alignItems: 'center',
    width: '33%',
    marginVertical: moderateScale(10),
  },
  iconContainer: {
    width: moderateScale(25),
    height: moderateScale(25),
    // borderRadius: moderateScale(25),
    // backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  
  },

});

export default AttachmentModal;