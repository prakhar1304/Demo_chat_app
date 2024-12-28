import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Image} from 'react-native-elements';

import {COLORS} from '../common/Constant/COLORS';
import {FONTS} from '../common/Constant/FONTS';
import color from '../common/color';
import Icon from '../common/Icon';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface StoryItemProps {
  imageUrl?: string;
  name: string;
  isAdd?: boolean;
}

interface UserData {
  name: string;
  email: string;
  bio: string;
  profilePic: string;
}

const StoryItem: React.FC<StoryItemProps> = ({imageUrl, name, isAdd}) => {
  return (
    <TouchableOpacity style={styles.storyItem}>
      <View style={styles.storyAvatar}>
        {isAdd ? (
          <View style={styles.addStoryButton}>
            <Icon
              type="MaterialCommunityIcons"
              name="plus"
              size={24}
              color={COLORS.black}
            />
          </View>
        ) : (
          <Image
            source={{
              uri: imageUrl || 'https://placeholder.com/150',
            }}
            style={{width: 60, height: 60, borderRadius: 15}}
          />
        )}
      </View>
      <Text style={styles.storyName}>{name}</Text>
    </TouchableOpacity>
  );
};

const HomeHeader: React.FC = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      if (!userId) return;

      const userDoc = await firestore().collection('Users').doc(userId).get();

      if (userDoc.exists) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Chats</Text>
        <View style={styles.iconContainer}>
          {/* <Icon
            type={'MaterialCommunityIcons'}
            name="chat-plus-outline"
            size={24}
            color={COLORS.black}
            style={styles.icon}
          /> */}

          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            {loading ? ( // Conditional rendering based on loading state
              <ActivityIndicator size="large" color={COLORS.theme} />
            ) : (
              <>
                <Avatar
                  size="small"
                  // rounded
                  source={{
                    uri:
                      userData?.profilePic ||
                      'https://logodix.com/logo/1984203.png',
                  }}
                  avatarStyle={{resizeMode: 'cover'}}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  logo: {
    fontFamily: FONTS.SemiBold,
    color: color.BLACK,
    fontSize: 22,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 18,
  },
  storiesContainer: {
    paddingVertical: 10,
  },
  storiesContent: {
    paddingHorizontal: 15,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyAvatar: {
    marginBottom: 4,
    // backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  storyName: {
    fontSize: 12,
    color: color.BLACK,
    fontFamily: FONTS.Regular,
  },
  addStoryButton: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
