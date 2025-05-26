import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import auth, { onAuthStateChanged } from '@react-native-firebase/auth';
import "react-native-polyfill-globals/patch";
import {firebase} from "@react-native-firebase/app";
import { initializeApp } from '@react-native-firebase/app';
const firebaseConfigWeb = {
  apiKey: "AIzaSyCgVgKvwTNNhVodPwdja1OippZsmyuV_VA",
  authDomain: "reactfinal-d3c46.firebaseapp.com",
  projectID: "reactfinal-d3c46",
  storageBucket: "reactfinal-d3c46.firebasestorage.app",
  messagingSenderId:"258508491415",
  appId:"1:258508491415:ios:9a1f126475d468999877d2",
}
initializeApp(firebaseConfigWeb);
export default function App() {
  const [user, setUser] = useState();
  const [email, setmail] = useState();
  const [pw, setp] = useState("");

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, [])
  const loginFn = () => {
    auth()
    .createUserWithEmailAndPassword(email,pw)
    .then(() => {
      console.log("User account created and signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address alr in use!")
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!")
      }
    })
  }

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          value={pw}
        />
        <Button title="Login!" onPress={loginFn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
