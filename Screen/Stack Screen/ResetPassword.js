import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleForgotPassword = async () => {
    try {
      if (!newPassword) {
        return Alert.alert('Error', 'Password is required');
      }

      const response = await axios.post('/reset-password/:id/:token', {
        email,
        password: newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password reset successful');
      } else {
        Alert.alert('Error', response.data.message);
      }
      
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred: ' + error.message);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Reset Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;
