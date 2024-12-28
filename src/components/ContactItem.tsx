// src/components/ContactList/ContactItem.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Contact} from 'react-native-contacts/type';

type ContactItemProps = {
  contact: Contact;
  onPress?: () => void;
};

export const ContactItem = ({contact, onPress}: ContactItemProps) => {
  const getInitials = () => {
    return (
      (contact.givenName?.[0] || '') + (contact.familyName?.[0] || '')
    ).toUpperCase();
  };

  const getDisplayName = () => {
    const name = `${contact.givenName || ''} ${
      contact.familyName || ''
    }`.trim();
    return name || 'No Name';
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.contactItem}>
        {contact.thumbnailPath ? (
          <Image
            source={{uri: contact.thumbnailPath}}
            style={styles.thumbnail}
          />
        ) : (
          <View style={styles.defaultThumbnail}>
            <Text style={styles.thumbnailText}>{getInitials()}</Text>
          </View>
        )}

        <View style={styles.contactDetails}>
          <Text style={styles.name}>{getDisplayName()}</Text>
          {contact.phoneNumbers?.[0] && (
            <Text style={styles.phone}>{contact.phoneNumbers[0].number}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 18,
    color: '#666',
  },
  contactDetails: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
