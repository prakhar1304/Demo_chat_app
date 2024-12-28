import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/Constant/COLORS';

// ... (keep the dummyChats and dummyStories arrays unchanged)
const dummyChats = [
  {
    id: '1',
    name: 'Test harsh',
    message: "That's awesome!",
    time: '20:00 PM',
    unread: 1,
    avatar:
      'https://www.shutterstock.com/image-photo/closeup-portrait-young-smiling-hispanic-260nw-2327799157.jpg',
  },
  {
    id: '2',
    name: 'Test samirbhai',
    message: 'She usually has to...',
    time: '19:00 PM',
    unread: 3,
    avatar:
      'https://img.freepik.com/free-photo/beautiful-male-half-length-portrait-isolated-white-studio-background-young-emotional-hindu-man-blue-shirt-facial-expression-human-emotions-advertising-concept-standing-smiling_155003-25250.jpg',
  },
  {
    id: '3',
    name: 'Test Prakhar',
    message: 'Good night',
    time: '10:00 PM',
    unread: 0,
    avatar:
      'https://www.shutterstock.com/image-photo/closeup-portrait-young-smiling-hispanic-260nw-2327799157.jpg',
  },
  {
    id: '4',
    name: 'Test Sahimbhai',
    message: 'hello',
    time: '10:00 PM',
    unread: 0,
    avatar:
      'https://th.bing.com/th/id/OIP.3_boBqM-InYls0zDPYYIwAHaHa?rs=1&pid=ImgDetMain',
  },
];

const dummyStories = [
  {
    id: '1',
    avatar:
      'https://www.shutterstock.com/image-photo/closeup-portrait-young-smiling-hispanic-260nw-2327799157.jpg',
    name: 'Test harsh',
  },
  {
    id: '2',
    avatar:
      'https://img.freepik.com/free-photo/beautiful-male-half-length-portrait-isolated-white-studio-background-young-emotional-hindu-man-blue-shirt-facial-expression-human-emotions-advertising-concept-standing-smiling_155003-25250.jpg',
    name: 'Test samirbhai',
  },
  {
    id: '3',
    avatar:
      'https://th.bing.com/th/id/OIP.3_boBqM-InYls0zDPYYIwAHaHa?rs=1&pid=ImgDetMain',
    name: 'Test Sahimbhai',
  },
  {
    id: '4',
    avatar:
      'https://www.shutterstock.com/image-photo/closeup-portrait-young-smiling-hispanic-260nw-2327799157.jpg',
    name: 'Test Prakhar',
  },
  {
    id: '5',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Test aman',
  },
];

const ChatList = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#4A0E8F" barStyle="light-content" />
      <View style={styles.container}>
        <LinearGradient colors={['#4A0E8F', '#7B1FA2']} style={styles.header}>
          <Text style={styles.headerTitle}>Chat List</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
            {dummyStories.map(story => (
              <TouchableOpacity key={story.id} style={styles.story}>
                <View style={styles.storyRound}>
                  <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                </View>
                <Text style={styles.storyName} numberOfLines={1}>
                  {story.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionSeparator} />

          <FlatList
            data={dummyChats}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('ChatScreen')}
              >
                <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
                <View style={styles.chatDetails}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    // flex: 1,
    backgroundColor: COLORS.bgColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 20,
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: COLORS.black,
  },
  storiesContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  story: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyRound: {
    borderWidth: 2,
    borderColor: '#7B1FA2',
    padding: 2,
    borderRadius: 34,
  },
  storyName: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 60,
    color: COLORS.black,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  chatAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#757575',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#7B1FA2',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 88,
  },
});

export default ChatList;

