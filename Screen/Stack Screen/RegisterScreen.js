import { StyleSheet, Text, View,KeyboardAvoidingView,TextInput,TouchableOpacity,Image,StatusBar, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import Toast from 'react-native-toast-message';


export default function LoginScreen() {
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false)
    const [email, setEmail] = useState('');
    const [emaiiVerify, setEmailVerify] = useState(false)
    const [mobile, setMobile] = useState("");
    const [mobileVerify, setMobileVerify] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation();

    function handleCreateNewUser(){
      const userData={
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      }
      if(nameVerify&&emaiiVerify&&mobileVerify&&passwordVerify){
        axios.post("http://192.168.223.145:3000/register", userData)
        .then(res=>{console.log(res.data)
          if(res.data.status=="ok"){
            Toast.show({
              type: 'success',
              text1: 'Congrat',
              text2: 'Registeration Successful'
            });
            // Alert.alert("Registeration Successful");
            navigation.navigate("HomeT")
            setLoading(true);
          }
          else{
            Alert.alert(JSON.stringify(res.data));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e=>console.log(e))
      }
      else{
        // Alert.alert("Fill all mandatory filed")
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Fill all mandatory filed'
        });
    }


      
    }

    function handleLogin(){
        navigation.navigate("Login")
    }

    function handleName(e){
        const nameVar = e;
        setName(nameVar);
        setNameVerify(false);
        if(nameVar.length>5){
            setNameVerify(true);
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
    function handleMobile(e){
        const mobileVar = e;
        setMobile(mobileVar);
        setMobileVerify(false);
        if(/^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/.test(mobileVar)){
            setMobile(mobileVar);
            setMobileVerify(true);
        }
    }




  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar style="light" backgroundColor={"#fff"} />
      <View style={styles.logoContainer}>
        {/* <Image source={require("./image/Icon1.png")} style={styles.imageIcon}/> */}
        {/* <Text style={styles.logoText}>CONTINUE WITH BUDDY</Text> */}
      </View>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Register</Text>
        <Text style={styles.subHeaderText}>
        Let get started!
        </Text>
      </View>

      <View style={styles.inputContainer}>
            <View style={styles.inputFiled}>
                {name.length<1? null: nameVerify ? null : (
                <Text 
                    style={{color:"red",}}
                >
                    Name should be more than five character
                </Text>
                )}
                <TextInput 
                    placeholder='Name' 
                    style={styles.input}
                    value={{}}
                    onChangeText={e=>handleName(e)}
                    
                />
                <View style={styles.checkMark}>
                    {/*Setting conditions for Validiations */}
                    {name.length<1? null: nameVerify ?
                    (<MaterialIcons name='check-circle' color='green' size={20}/>)
                    
                    :
                    (<MaterialIcons name='error' color='red' size={20} />)
                    }

                </View>
            </View>
 


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
                {mobile.length<1? null: mobileVerify ? null : (
                    <Text 
                        style={{color:"red",}}
                    >
                        Enter correct number.
                    </Text>
                    )}
                <TextInput 
                    placeholder='Mobile' 
                    style={styles.input}
                    value={{}}
                    onChangeText={e=>handleMobile(e)}
                    keyboardType=''
                    autoCapitalize='none'
                />

                <View style={styles.checkMark}>
                    {/*Setting conditions for Validiations */}
                    {mobile.length<1? null: mobileVerify ?
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
                        Special characters, capital & small cases , numbers!
                    </Text>
                    )}

                <TextInput 
                    placeholder='Password eg: 12345!!@#asdAAD' 
                    style={styles.input}
                    value={{}}
                    onChangeText={e=>handlePasswod(e)}
                    secureTextEntry={!showPassword}
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
                        onPress={()=>setShowPassword(!showPassword)}
                        style={styles.icon}
                        >
                            <Ionicons name={showPassword? "eye-off": "eye"} size={20} color='gray'/>
                </TouchableOpacity>

            </View>



      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>handleCreateNewUser()}  disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Enter</Text>
                    )}
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Have an accout?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButton}>Login</Text>
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
  checkMarkPassword:{
    position:"absolute",
    right: 10,
    // bottom: 13,
    top:13,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    

  }
});
