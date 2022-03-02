import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authentication } from '../../../firebase/firebase-config';


const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  //text input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((re)=>{
      console.log(re);
      setIsSignedIn(true)
    })
    .catch((re)=>{
      console.log(re);
    })
  }

  const signOutUser = ()=> {
    signOut(authentication)
    .then((re)=>{
      setIsSignedIn(false)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <View>
        <Text>Hello</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={password => setPassword(password)}></TextInput>
        {isSignedIn === true?
          <Button title='Sign Out' onPress={signOutUser}/>
          :
          <Button title='Sign In' onPress={signInUser}/>
        }
      {/* <Button title="register" onPress={registerUser}/> */}
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})