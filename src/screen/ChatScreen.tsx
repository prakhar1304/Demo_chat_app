import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import {Bubble, Composer, GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import Icon from '../common/Icon';
import {COLORS} from '../common/Constant/COLORS';
import color from '../common/color';
import {FONTS} from '../common/Constant/FONTS';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomHeader from '../components/chat/CustomHeader';
import AttachmentModal from '../components/AttachmentModal';

interface ChatMessage extends IMessage {
  sendBy?: string;
  sendTo?: string;
}

interface ChatDetails {
  from: string;
  to: string;
  name: string;
  chats:any;
}

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
  const [isAttachmentModalVisible, setIsAttachmentModalVisible] = useState(false);
  const fetchMessages = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://qa.corider.in/assignment/chat?page=${pageNumber}`,
      );
      const json = await response.json();
      console.log('Chat data:', json);
     console.log('page name:', pageNumber);
      if (pageNumber === 0) {
        setChatDetails({
          from: json.from,
          to: json.to,
          name: json.name,
          chats: json.chats
        });

        // Find and set the current user ID (first message where self is true)
        const currentUser = json.chats.find((chat: any) => chat.sender.self);
        if (currentUser) {
          setCurrentUserId(currentUser.sender.user_id);
        }
      }

      const formattedMessages: ChatMessage[] = json.chats.map((chat: any) => ({
        _id: chat.id,
        text: chat.message.replace(/<br>/g, '\n'), // Handle line breaks in messages
        createdAt: new Date(chat.time),
        user: {
          _id: chat.sender.user_id,
          name: chat.sender.name || 'Unknown User',
          avatar: chat.sender.image,
        },
      }));

            // Check if we received any messages
            if (formattedMessages.length === 0) {
              setHasMoreMessages(false);
              return;
            }
      
            // Append messages based on page number
            setMessages(prevMessages => 
              pageNumber === 0 
                ? formattedMessages 
                : [...prevMessages, ...formattedMessages]
            );
      
          } catch (error) {
            console.error('Error fetching messages:', error);
            setHasMoreMessages(false);
          } finally {
            setIsLoading(false);
          }
        };
      
        useEffect(() => {
          // Initial load of page 0
          fetchMessages(0);
        }, []);
      
        const onLoadEarlier = useCallback(() => {
          if (!isLoading && hasMoreMessages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMessages(nextPage);
          }
        }, [isLoading, hasMoreMessages, page]);

  //     if (pageNumber === 0) {
  //       setMessages(formattedMessages);
  //     } else {
  //       setMessages(prevMessages => [...prevMessages, ...formattedMessages]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching messages:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMessages(0);
  // }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  // const onLoadEarlier = () => {
  //   if (!isLoading) {
  //     const nextPage = page + 1;
  //     setPage(nextPage);
  //     fetchMessages(nextPage);
  //   }
  // };

  // const CustomHeader = () => (
  //   <View style={{}}>
  //   <View style={styles.headerContainer}>
  //     <TouchableOpacity
  //       style={styles.backButton}
  //       onPress={() => navigation.goBack()}>
  //       <Icon
  //         type="Ionicons"
  //         name="arrow-back"
  //         size={moderateScale(24)}
  //         color={COLORS.black}
  //       />
  //     </TouchableOpacity>

  //     <View style={styles.headerContent}>
  //       <Text style={styles.tripName}>{chatDetails?.name || 'Loading...'}</Text>
    
  //     </View>

  //     <TouchableOpacity style={styles.menuButton}>
  //     <Image source={require("../assets/icon/edit.png")} style={{height: 26 , width:26}} />
  //     </TouchableOpacity>
  //   </View>
  //   <View style ={[styles.headerContainer,{   borderBottomWidth: 1,
  //   borderBottomColor: COLORS.border,}]}>
  //  <Image source={{uri: 'https://th.bing.com/th/id/R.e2bb45fff1e398723c711c519502d5a3?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0'}} style={styles.avatar} />
        

  //  <View style={styles.headerContent}>
       
  //       <Text style={styles.tripDetails}>
  //         {chatDetails ? `${chatDetails.from} → ${chatDetails.to}` : ''}
  //       </Text>
  //     </View>
  
  //   <TouchableOpacity style={styles.menuButton}>
  //       <Icon
  //         type="Entypo"
  //         name="dots-three-vertical"
  //         size={20}
  //         color={COLORS.black}
  //       />
  //     </TouchableOpacity>
  //   </View>
  //   </View>
  // );

  const handleAttachmentOption = (option: string) => {
    console.log('Selected option:', option);
    // Handle different attachment options here
    setIsAttachmentModalVisible(false);
  };

  const renderAvatar = (props: any) => {
    const {currentMessage} = props;
    // Don't show avatar for self messages
    if (currentMessage?.user._id === currentUserId) {
      return null;
    }
    // Show avatar for received messages
    return (
      <Image
        source={{uri: currentMessage?.user.avatar}}
        style={styles.avatar}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.bgColor} barStyle="dark-content" />
      {/* <CustomHeader /> */}
      <CustomHeader 
  chatDetails={chatDetails} 
  navigation={navigation}
  chats={messages} // Pass the messages array to extract profile images
/>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: currentUserId,
        }}
        loadEarlier={true}
        isLoadingEarlier={isLoading}
        onLoadEarlier={onLoadEarlier}
        infiniteScroll={true}
        renderAvatar={renderAvatar}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.theme,
                borderBottomRightRadius: 0,
                padding: moderateScale(5),
                borderTopRightRadius: moderateScale(7),
              },
              left: {
                backgroundColor: COLORS.white,
                borderBottomLeftRadius: 0,
                elevation: 1,
              },
            }}
            textStyle={{
              left: {
                fontFamily: FONTS.Regular,
                color: COLORS.fontColor,
              },
              right: {
                fontFamily: FONTS.Regular,
                color: COLORS.white,
                fontWeight: '400',
              },
            }}
          />
        )}
        renderActions={() => (
          <TouchableOpacity style={styles.plusButton}
          onPress={() => setIsAttachmentModalVisible(true)}>
            <Icon
              type={'Entypo'}
              size={22}
              color={color.BLACK}
              name={'attachment'}
            />
          </TouchableOpacity>
        )}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={{
              color: COLORS.black,
              fontSize: 15,
              // backgroundColor: COLORS.white,
              paddingHorizontal: '5%',
              borderRadius: moderateScale(4),
              height: moderateScale(70),
            }}
          />
        )}
        renderSend={props => (
          <TouchableOpacity
            onPress={() => props.onSend({text: props.text}, true)}
            style={styles.sendButton}>
            {/* <Icon
              type={'Ionicons'}
              name={'send'}
              size={moderateScale(22)}
              color={COLORS.theme}
            /> */}

            <Image source={require("../assets/icon/send.png")} style={{height: 26 , width:26}} />
          </TouchableOpacity>
        )}
        renderInputToolbar={props => (
          <View style={styles.inputToolbar}>
          <View style={{flexDirection:"row" , backgroundColor: COLORS.white ,elevation:1, borderRadius:moderateScale(10) , width:"100%" , justifyContent:"space-between" , alignItems:"center"}}>
            {props.renderComposer ? props.renderComposer(props) : null}
            {props.renderActions ? props.renderActions() : null}
            {props.renderSend ? props.renderSend(props) : null}
            </View>
          </View>
        )}
      />
      <AttachmentModal
  visible={isAttachmentModalVisible}
  onClose={() => setIsAttachmentModalVisible(false)}
  onOptionSelect={handleAttachmentOption}
/>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    paddingHorizontal:16,
    paddingVertical:5,
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
  tripDetails: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.lightGray,
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    height: 60,
   paddingHorizontal: 20,
    backgroundColor: COLORS.bgColor,
    // bottommargin: 10,
  },
  plusButton: {
    paddingHorizontal: 12,
  
    marginLeft: -8,
    marginBottom:2,
    justifyContent: 'center',
    
   
  },
  sendButton: {
    paddingHorizontal: scale(10),
   
    height: scale(38),
    marginLeft: -8,
    marginBottom:2,
    justifyContent: 'center',
  
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 5,
    marginBottom: 5,
  },
});
