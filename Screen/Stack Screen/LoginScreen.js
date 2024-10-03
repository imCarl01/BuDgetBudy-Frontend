import { StyleSheet, Text, View,KeyboardAvoidingView,TextInput,TouchableOpacity,Image,StatusBar,Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [emaiiVerify, setEmailVerify] = useState(false)
    const [password,setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [showPasword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    function handleLogin(){
      const userData ={
        email: email,
        password: password,
      }
      if(email&&password){
        axios.post("http://192.168.223.145:3000/login-user",userData)
        .then(res=>{console.log(res.data)
          if(res.data.status=="ok"){
            AsyncStorage.setItem("token", res.data.data)
            AsyncStorage.setItem("isLoggedIn", JSON.stringify(true)) // this must be here for the user data to show.
            // Alert.alert("Login Successful")
            Toast.show({
              type: 'success',
              text1: 'Welcome',
              text2: 'Login Successful'
            });
            // setLoading(true);
            navigation.navigate("HomeT");
          }else{
            // Alert.alert(JSON.stringify(res.data));
            // setLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Incorrect Password'
            });
          }
         
        })
        .catch(e=>console.log(e))
        
      }else{
        // Alert.alert("Fill all mandatory filed")
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Fill all mandatory filed'
        });
      }
    
      
    }
    


    function handleEmail(e){
      const emailVar = e;
      setEmail(emailVar);
      
      setEmailVerify(false);
      if(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
          setEmail(emailVar)
          setEmailVerify(true);
      }
  }

  function handlePasswod(e){
      const passwordVar = e;
      setPassword(passwordVar);
      setPasswordVerify(false);
      if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordVar)){
          setPassword(passwordVar);
          setPasswordVerify(true);
      }
  }

    const handleToLoginScreen=()=>{
        navigation.navigate("Register")
    }
    const handleForgotPaswordScreen=()=>{
      navigation.navigate("Forgot Password")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
       <StatusBar style="light" backgroundColor={"#fff"} />
      <View style={styles.logoContainer}>
        {/* <Image source={require("./image/Icon1.png")} style={styles.imageIcon}/> */}
        {/* <Text style={styles.logoText}>CONTINUE WITH BUDDY</Text> */}
      </View>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.subHeaderText}>
        Let get back in!
        </Text>
      </View>

      <View style={styles.inputContainer}>
          <View style={styles.inputFiled}>
              {email.length<1? null: emaiiVerify ? null : (
                        <Text 
                            style={{color:"red",}}
                        >
                            Enter correct email address
                        </Text>
              )}
              <TextInput 
                    placeholder='Email Address' 
                    style={styles.input}
                    value={{}}
                    onChangeText={e=>handleEmail(e)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                  <View style={styles.checkMark}>
                    {/*Setting conditions for Validiations */}
                    {email.length<1? null: emaiiVerify ?
                    (<MaterialIcons name='check-circle' color='green' size={20}/>)
                    
                    :
                    (<MaterialIcons name='error' color='red' size={20} />)
                    }

                </View>
          </View>

          <View style={styles.inputFiled}>
                    {password.length<1? null: passwordVerify ? null : (
                    <Text 
                        style={{color:"red",}}
                    >
                        Password eg: 12345!!@#asdAAD
                    </Text>
                    )}
            <TextInput 
                  placeholder='Password' 
                  style={styles.input}
                  value={{}}
                  onChangeText={e=>handlePasswod(e)}
                  secureTextEntry={!showPasword}
              />

              <View style={styles.checkMark}>
                    
                    {/*Setting conditions for Validiations */}
                    {password.length<1? null: passwordVerify ?
                    (<MaterialIcons name='check-circle' color='green' size={20}/>)
                    
                    :
                    (<MaterialIcons name='error' color='red' size={20} />)
                    }

                    
                </View>

                <TouchableOpacity 
                        onPress={()=>setShowPassword(!showPasword)}
                        style={styles.icon}
                        >
                            <Ionicons name={showPasword? "eye-off": "eye"} size={20} color='gray'/>
                </TouchableOpacity>
          </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>handleLogin()} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Enter</Text>
                    )}
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={handleForgotPaswordScreen}>
          <Text style={styles.ForgotButton}>Forgot Password?</Text>
        </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Create an Account?</Text>
        <TouchableOpacity onPress={handleToLoginScreen}>
          <Text style={styles.loginButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageIcon:{
    width: 150,
    height:150,
  },

  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#93278F',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: '#888',
  },
  ForgotButton:{
    color: '#888',
  },
  loginButton: {
    fontSize: 14,
    color: '#FFC801',
    fontWeight: '600',
    marginLeft: 5,
  },
  inputFiled:{
    position:"relative"
  },
  checkMark:{
    position:"absolute",
    right: 10,
    borderRadius: 50,
    bottom:30,
  },
});
