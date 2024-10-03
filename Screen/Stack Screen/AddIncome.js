import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AddIncomeScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = () => {
 
    if (amount && source) {
        navigation.navigate('Home', {
          result: {
            amount,
            source,
            type: 'income'
          },
          
  
        });
      }

      if (amount && source) {
        navigation.navigate('Income', {
          result: {
            amount,
            source,
            type: 'income'
          },
          
  
        });
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Source</Text>
        <TextInput
          style={styles.input}
          value={source}
          onChangeText={setSource}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  form: { marginTop: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 15, marginBottom: 20 },
  submitButton: { backgroundColor: '#2ECC71', padding: 15, borderRadius: 10 },
  submitButtonText: { color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' }
});
