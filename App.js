
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
 
export default function App() {
  const [email, setEmail] = useState("");
  const [emailError,setemailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const[message,setMessage] = useState("");

    const signin = async() =>{
      if (email!="" && password!=""){
        //Alert.alert('Thank you for sign in');
        await fetch('http://10.100.18.20:8090/rbd/aclUser/apiLogin',{ 
          method:'POST',
          dataType:'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            'username':email,
            'password': password
          })

        }).then(response => response.json())
        .then(response => {
        
            console.log(response.result)
            Alert.alert(response.result)
            setMessage(response.result)
        
        })
        // .then(resdata => {
        //   //var newDAta = JSON.parse(data);
        //   console.log(resdata);
        //   // Alert.alert(data.result);
        // console.log("Success Besti");
        // // console.log(data);
        // // var test_data = JSON.parse(data);
        // // console.log(test_data);

        // //setMessage(responseData.result)
        // })
        .catch((error) =>{
          console.error(error);
        });
      }
      if (email!=""){
        //Alert.alert(email);
        setemailError("");
      }else{
        setemailError('Hey! Email should not be empty');
      }
      if(password!=""){
        //Alert.alert(password);
        setPasswordError("")
      }else{
        setPasswordError('Hey! Password should not be empty');
    }
  }
    
    const forgot =()=>{
      Alert.alert('Forgot Password.')
    }
  
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/log2.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          value={email}
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          onChange= {() => setemailError("")}
        />
      </View>
      <Text style={{color:"red", marginLeft:20,}}>{emailError}</Text>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          value={password}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          onChange= {() => setPasswordError("")}
        />
      </View>
      <Text style={{color:"red", marginLeft:20,}}>{passwordError}</Text>
 
      <TouchableOpacity onPress={forgot}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={signin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#b0c4de",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#778899",
  },
})

