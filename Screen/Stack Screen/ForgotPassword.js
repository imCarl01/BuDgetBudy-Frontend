import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState("");



  function handlePasswordReset() {
    axios.post("http://192.168.223.145:3000/forgot-password", { email })
      .then(res => {
        if (res.data.status === "ok") {
          Toast.show({
            type: "success",
            text1: "Email Sent",
            text2: "Check your email for reset instructions",
          });
          setModalVisible( "Reset Link Sent Successfully Please check your email. If you can't find the link, check your spam folder.")
          
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.data.data,
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred, please try again",
        });
      });
  }



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.modalTitle} value={modalVisible}>Reset Link Sent Successfully</Text>



      {/* Modal
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when request
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Image 
              source={require('./Image/forgot-password-concept-illustration.png')} 
              style={styles.ForgotPasswordImage}
            />
            <Text style={styles.modalTitle}>Reset Link Sent Successfully</Text>
            <Text style={styles.modalEmail}>Please check your email. If you can't find the link, check your spam folder.</Text>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Close modal on button press
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  button: { backgroundColor: '#3498DB', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: 300,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  modalEmail: { textAlign: 'center', color: '#333' },
  closeButton: { marginTop: 20, padding: 10, backgroundColor: '#3498DB', borderRadius: 5 },
  closeButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  ForgotPasswordImage: { width: 200, height: 200, marginBottom: 20 },
});
