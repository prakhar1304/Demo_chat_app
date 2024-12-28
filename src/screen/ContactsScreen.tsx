import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import color from '../common/color';
import {FONTS} from '../common/Constant/FONTS';
import {COLORS} from '../common/Constant/COLORS';
import Icon, {Icons} from '../common/Icon';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

interface ContactItemProps {
  item: Contact;
}

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>([]);

  // Filter out contacts without names and sort alphabetically
  const processContacts = (contactsList: Contact[]): Contact[] => {
    // Remove contacts without both given name and family name
    const validContacts = contactsList.filter(contact => {
      const hasName =
        (contact.givenName || contact.familyName) &&
        (contact.givenName?.trim() || contact.familyName?.trim());
      return hasName;
    });

    // Sort remaining contacts
    return validContacts.sort((a, b) => {
      const nameA = `${a.givenName || ''} ${a.familyName || ''}`
        .trim()
        .toLowerCase();
      const nameB = `${b.givenName || ''} ${b.familyName || ''}`
        .trim()
        .toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  // Improved search functionality
  useEffect(() => {
    if (contacts.length > 0) {
      const query = searchQuery.trim().toLowerCase();

      if (query === '') {
        setDisplayedContacts(processContacts(contacts));
      } else {
        const filtered = contacts.filter(contact => {
          // Get the full name and phone numbers
          const fullName = `${contact.givenName || ''} ${
            contact.familyName || ''
          }`
            .trim()
            .toLowerCase();
          const phoneNumbers = contact.phoneNumbers
            ? contact.phoneNumbers.map(phone =>
                phone.number.replace(/[^0-9]/g, ''),
              )
            : [];

          // Check if query matches beginning of first or last name
          if (
            contact.givenName?.toLowerCase().startsWith(query) ||
            contact.familyName?.toLowerCase().startsWith(query)
          ) {
            return true;
          }

          // Check if query matches full name
          if (fullName.includes(query)) {
            return true;
          }

          // Check if query matches phone numbers
          const numericQuery = query.replace(/[^0-9]/g, '');
          if (
            numericQuery &&
            phoneNumbers.some(number => number.includes(numericQuery))
          ) {
            return true;
          }

          return false;
        });

        setDisplayedContacts(processContacts(filtered));
      }
    }
  }, [contacts, searchQuery]);

  const getContacts = async (): Promise<void> => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts',
          buttonPositive: 'OK',
        },
      );

      if (permission === 'granted') {
        const contactsList = await Contacts.getAll();
        setContacts(processContacts(contactsList));
      }
    } catch (error) {
      console.log('Error loading contacts:', error);
    }
  };

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
  };

  const getInitials = (contact: Contact): string => {
    const first = contact.givenName?.[0] || '';
    const last = contact.familyName?.[0] || '';
    return (first + last).toUpperCase();
  };

  const renderContactItem = ({item}: ContactItemProps) => {
    if (!item.givenName?.trim() && !item.familyName?.trim()) {
      return null;
    }

    return (
      <View style={styles.contactItem}>
        {item.thumbnailPath ? (
          <Image source={{uri: item.thumbnailPath}} style={styles.thumbnail} />
        ) : (
          <View style={styles.defaultThumbnail}>
            <Text style={styles.thumbnailText}>{getInitials(item)}</Text>
          </View>
        )}

        <View style={styles.contactDetails}>
          <Text style={styles.name}>
            {`${item.givenName || ''} ${item.familyName || ''}`.trim()}
          </Text>
          {item.phoneNumbers?.[0] && (
            <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon
          type={'Fontisto'}
          name={'search'}
          size={moderateScale(15)}
          color={COLORS.lightGray}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchBar}
          placeholderTextColor={COLORS.lightGray}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <FlatList
        data={displayedContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.recordID}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginLeft: scale(4),
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  defaultThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#166FF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.LatoRegular,
  },
  contactDetails: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#0F1828',
    fontFamily: FONTS.SemiBold,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEDED',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(50),
    paddingHorizontal: scale(15),
    paddingLeft: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.fontColor,
    fontFamily: FONTS.SemiBold,
    fontWeight: '600',
    marginLeft: scale(4),
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  searchContainer: {
    backgroundColor: COLORS.bgColor,
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(10),
    height: verticalScale(36),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(4),
    elevation: 1,
  },
  searchBar: {
    flex: 1,
    color: COLORS.lightGray,
    paddingHorizontal: scale(10),
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(15),
  },
});

export default ContactsList;
