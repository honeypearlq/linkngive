// screens/ManageItems.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ManageItems = ({ navigation, uploadedItems }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Items</Text>
      {uploadedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't uploaded any items yet.</Text>
        </View>
      ) : (
        <FlatList
          data={uploadedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate('UploadItems')}
      >
        <Text style={styles.uploadButtonText}>Upload New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, fontWeight: 'bold' },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default ManageItems;