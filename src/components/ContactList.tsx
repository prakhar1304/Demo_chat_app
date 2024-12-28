// src/components/ContactList/ContactList.tsx
import React, {useMemo} from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {Contact} from 'react-native-contacts/type';
import {ContactItem} from './ContactItem';

type ContactListProps = {
  contacts: Contact[];
  onContactPress?: (contact: Contact) => void;
};

type Section = {
  title: string;
  data: Contact[];
};

export const ContactList = ({contacts, onContactPress}: ContactListProps) => {
  // Create sections and sort contacts
  const sections = useMemo(() => {
    // First, sort all contacts
    const sortedContacts = [...contacts].sort((a, b) => {
      const nameA = `${a.givenName} ${a.familyName}`.trim().toLowerCase();
      const nameB = `${b.givenName} ${b.familyName}`.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Create sections object
    const sectionMap: {[key: string]: Contact[]} = {};

    // Group contacts by first letter
    sortedContacts.forEach(contact => {
      const firstName = contact.givenName || contact.familyName || '';
      const firstLetter = firstName.charAt(0).toUpperCase();

      if (!sectionMap[firstLetter]) {
        sectionMap[firstLetter] = [];
      }
      sectionMap[firstLetter].push(contact);
    });

    // Convert to array of sections
    const sectionArray: Section[] = Object.keys(sectionMap)
      .sort()
      .map(letter => ({
        title: letter,
        data: sectionMap[letter],
      }));

    return sectionArray;
  }, [contacts]);

  const renderSectionHeader = ({section}: {section: Section}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  const renderItem = ({item}: {item: Contact}) => (
    <ContactItem contact={item} onPress={() => onContactPress?.(item)} />
  );

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={item => item.recordID}
      stickySectionHeadersEnabled={true}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginLeft: 66,
  },
});
