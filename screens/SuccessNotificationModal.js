import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuccessNotificationModal = ({ isModalVisible, setIsModalVisible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="checkmark-circle-outline" size={60} color="#74112f" />
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Darkened overlay for better focus
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,  // Rounded corners for a polished look
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,  // Add shadow for a floating effect
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Raleway_700Bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#74112f',  // Green background for success
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Raleway_700Bold',
    fontSize: 16,
  },
});

export default SuccessNotificationModal;