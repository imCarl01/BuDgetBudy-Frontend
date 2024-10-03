import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function IncomeScreen() {
  const navigation = useNavigation();
  const [incomes, setIncomes] = useState([]); // Store income details here
  const [totalIncome, setTotalIncome] = useState(0); // Store the total income amount
  const route = useRoute();

  // Whenever route.params changes, update the incomes and total income
  React.useEffect(() => {
    if (route.params?.result) {
      const newIncome = {
        amount: route.params.result.amount,
        source: route.params.result.source,
        date: route.params.result.date,
      };
      setIncomes([...incomes, newIncome]);
      setTotalIncome((prev) => prev + parseFloat(newIncome.amount));
    }
  }, [route.params]);

  function handleAddIncome() {
    navigation.navigate('Add Income');
  }



  const renderIncomeItem = ({ item }) => (
    <View style={styles.incomeItem}>
      <View style={styles.incomeDetails}>
        <Text style={styles.incomeSource}>{item.source}</Text>
        <Text style={styles.incomeAmount}>${item.amount}</Text>
      </View>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Income: ${totalIncome.toFixed(2)}</Text>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.incomeContainer}>
        <Text style={styles.sectionTitle}>Earnings</Text>
        <FlatList
          data={incomes}
          renderItem={renderIncomeItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  incomeContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incomeItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  incomeDetails: {
    flexDirection: 'column',
  },
  incomeSource: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
});
