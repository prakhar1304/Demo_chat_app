import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../common/Constant/FONTS';
import { COLORS } from '../../common/Constant/COLORS';
import Icon from '../../common/Icon';

interface ChatSender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
  name?: string;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: ChatSender;  // Made optional
  time: string;
}

interface ChatDetails {
  from: string;
  to: string;
  name: string;
  chats: ChatMessage[];
}

interface CustomHeaderProps {
  chatDetails: ChatDetails | null;
  navigation: NavigationProp<any>;
  chats: ChatMessage[];  // Made optional
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  chatDetails, 
  navigation, 
  chats
}) => {
  const [profileImages, setProfileImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Get unique senders and their images
    const uniqueSenders = new Map<string, {image: string, userId: string}>();
    
    chats.forEach(chat => {
      if (chat.sender && chat.sender.image && !uniqueSenders.has(chat.sender.user_id)) {
        uniqueSenders.set(chat.sender.user_id, {
          image: chat.sender.image,
          userId: chat.sender.user_id
        });
      }
    });

    // Convert to array and take first 4 unique senders
    const uniqueImages = Array.from(uniqueSenders.values()).slice(0, 4);
    setProfileImages(uniqueImages);
    
    console.log("Unique senders found:", uniqueImages.length);
    console.log("Chat details:", chatDetails);
  }, [chats]);

  // Default image as fallback
  const defaultImage = 'https://i.ibb.co/LdVZHLx/group.png';

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon
            type="Ionicons"
            name="arrow-back"
            size={moderateScale(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.tripName}>{chatDetails?.name || 'Trip 1'}</Text>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Image 
            source={require("../../assets/icon/edit.png")} 
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.headerContainer, styles.subHeader]}>
        <View style={styles.profileGrid}>
          {profileImages.length > 0 ? (
            profileImages.map((image, index) => (
              <Image 
                key={index}
                source={{ uri: image || defaultImage }} 
                style={[
                  styles.profileImage,
                  index % 2 === 1 && styles.profileImageRight,
                  index >= 2 && styles.profileImageBottom
                ]}
                defaultSource={{ uri: defaultImage }}  // Fallback image
              />
            ))
          ) : (
            // Show a single default image if no profile images are available
            <Image 
              source={{ uri: defaultImage }}
              style={styles.singleProfileImage}
            />
          )}
        </View>

        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>From </Text>
            <Text style={styles.boldLocationText}>{chatDetails?.from || 'IGI Airport, T3'}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>To </Text>
            <Text style={styles.boldLocationText}>{chatDetails?.to || 'Sector 28'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Icon
            type="Entypo"
            name="dots-three-vertical"
            size={20}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  subHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  tripName: {
    fontSize: 24,
    fontFamily: FONTS.Bold,
    color: COLORS.black,
  },
  menuButton: {
    padding: 8,
  },
  editIcon: {
    height: 26,
    width: 26
  },
  profileGrid: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8,
  },
  profileImage: {
    width: 18,
    height: 18,
    borderRadius: 9,
    margin: 1,
  },
  singleProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileImageRight: {
    marginLeft: 2,
  },
  profileImageBottom: {
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationText: {
    fontSize: 18,
    fontFamily: FONTS.Regular,
    color: COLORS.gray,

  },
  boldLocationText: {
    fontSize: 18,
    fontFamily: FONTS.Bold,
    color: COLORS.fontColor,
  }
});

export default CustomHeader;