import { StyleSheet, Text, View, SafeAreaView, Image,Button,FlatList, ScrollView} from 'react-native'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Modal } from 'react-native';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const [incomes, setIncomes] =useState([]);
  const [totalIncome, setTotalIncome] = useState(0)
  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense]= useState(0);
  const route = useRoute();
  // const {result} = route.params;
  React.useEffect(() => {
    if (route.params?.result) {
      const newTransaction = {
        amount: route.params.result.amount,
        source: route.params.result.source,
        date: route.params.result.date,
      };
  
      if (route.params.result.type === 'income') {
        setIncomes([...incomes, newTransaction]);
        setTotalIncome((prev) => prev + parseFloat(newTransaction.amount));
      } else if (route.params.result.type === 'expense') {
        setExpense([...expense, newTransaction]);
        setTotalExpense((prev) => prev + parseFloat(newTransaction.amount));
      }
    }
  }, [route.params]);
  

  const toggleModal= ()=>{
    setModalVisible(!modalVisible)
  }
  
  function handleToIncome(){
    navigation.navigate("Income")
  }

  function handleToExpense(){
    navigation.navigate("Expense")
  }

  function handleToProfile(){
    navigation.navigate("Profiles")
  }

  useFocusEffect( // it causes a reset of the Modal visibilty to false.
    useCallback(()=>{
      setModalVisible(false) 
    },[])
  )

    const renderIncomeItem = ({ item }) => (
      <View style={styles.incomeItem}>
        <View style={styles.incomeDetails}>
          <Text style={styles.incomeSource}>{item.source}</Text>
          <Text style={styles.incomeAmount}>${item.amount}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    );

    const renderTotalExpense=({item})=>{
      return(
        <View style={styles.incomeItem}>
        <View style={styles.incomeDetails}>
          <Text style={styles.incomeSource}>{item.source}</Text>
          <Text style={styles.incomeAmount}>${item.amount}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      )
  
    }

  const currentBalanceGotten = totalIncome - totalExpense;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer} >
        <View >
          <Text style={styles.greating}>Hi,</Text>
          <Text style={styles.greatingName}></Text>
        </View>
        
        <View style={styles.ImagemageC}>
          <TouchableOpacity onPress={handleToProfile}>
            <View style={styles.imageContainer}>
              <Image source={require('./image/blank-profile-picture-973460_960_720.webp')} style={styles.image}/>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.balanceContainer}>
        <View style={styles.balanceFrame}>
          <View style={styles.balanceContent}>
              <View style={styles.balance}>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.balanceAmount}>${currentBalanceGotten.toFixed(2)}</Text>


                <View style={styles.balanceAll}>
                <Text style={styles.currentBalance}>Income: ${ totalIncome.toFixed(2)}</Text>
                <Text style={styles.currentBalance}>Expenses: ${totalExpense.toFixed(2)}</Text>
                </View>
              </View>

              <TouchableOpacity>
                <Text style={styles.currentBalance}>Transactions</Text>
              </TouchableOpacity>
              
              
          </View>
 

        </View>


        <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <MaterialIcons name='add' size={45} color="#fff"/>
              </TouchableOpacity>
          </View>
     
      </View>

      <View style={styles.transcationContainer} >
        <View >
          <Text style={styles.recentTranscationTitle}>Recent Transactions</Text>
        </View>
      </View>

      <View style={styles.incomeContainers} showsVerticalScrollIndicator={false}>
          {route.params?.result?.type === 'income'?(
                       <FlatList
                       data={incomes}
                       renderItem={renderIncomeItem}
                       keyExtractor={(item, index) => index.toString()}
                     />
          ): <FlatList
          data={expense}
          renderItem={renderTotalExpense}
          keyExtractor={(item, index) => index.toString()}
        />}
 
        </View>

      <Modal 
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Choose Transaction Type</Text>
      
      <View style={styles.modalButtonsContainer}>
        <TouchableOpacity style={[styles.modalButton, styles.incomeButton]} onPress={handleToIncome}>
          <Text style={styles.modalButtonText}>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.modalButton, styles.expenseButton]} onPress={handleToExpense}>
          <Text style={styles.modalButtonText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"flex-start",
    
    backgroundColor:"#fff"
  },
  greating:{
    fontWeight:"105",
    fontSize:25,
  },
  greatingName:{
    fontWeight:"bold",
    fontSize:30,
  },
  headerContainer:{
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    margin:10,
  },
  ImagemageC:{
    borderWidth:2,
    borderRadius:50,
    borderColor:"#3498DB",
  },
  imageContainer:{
    width:50,
    height:50,


  },
  image:{
    width:50,
    height:50,
    borderRadius:50,
  },
  balanceContainer:{
    margin:10,
    backgroundColor:"#3498DB",
    padding:15,
    borderRadius:15,
  },
  balanceFrame:{
    flexDirection:"row"
  },
  balanceContent:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  buttonContainer:{
    right:-250,
    width:50,
    height:50,
    borderRadius:50,
    backgroundColor:"#FFC801",
    bottom:20,
  },
  addButton:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    
  },
  currentBalance:{
    fontSize:15,
    color:"#fff",
    fontWeight:"300"
  },
  balanceAmount:{
    color:"#fff",
    fontSize:35,
    fontWeight:"bold",
    top:5,
  },
  balanceAll:{
    top:30,
  },
  transcationContainer:{
    margin:10,
    backgroundColor:"#3498DB",
    padding:20,
    borderRadius:15,
  },
  recentTranscationTitle:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:17,
  }, 
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  incomeButton: {
    backgroundColor: '#2ECC71', // Green color for Income button
  },
  expenseButton: {
    backgroundColor: '#E74C3C', // Red color for Expense button
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#3498DB', // Blue color for close button
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  incomeContainers:{
    margin:10,
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


})