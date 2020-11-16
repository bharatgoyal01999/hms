import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

registerDoctor = (email, password,name,lic,spec,phone) => {
  if(email && password){
  
  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    Alert.alert('User account created & signed in!');
    const user = firebase.auth().currentUser
    if(user){
      AsyncStorage.setItem("UID",user.uid);
      const path_ref=firebase.database.ref('/Doctor').child(user.uid).child('personalInfo')
      const Personal_Info={
        Name:name,
        Email:email,
        LicenseNumber:lic,
        Speciality:spec,
        Phone: phone,
      }
      path_ref.set(Personal_Info)
    }
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
    }

    console.error(error);
    Alert.alert(error)
  });
  return user.name;
}
  else{
    Alert.alert('Enter details to signup!')
  }
}


registerUser = (email, password,name,phone) => {
  if(email && password){
  firebase
  .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('User account created & signed in!');
      const user = firebase.auth().currentUser
      if(user){
        AsyncStorage.setItem("UID",user.uid);
        const path_ref=firebase.database.ref('/User').child(user.uid).child('personalInfo')
        const Personal_Info={
          Name:name ,
          Email:email,
          Phone: phone,
        }
        path_ref.set(Personal_Info)
      }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
  
      console.error(error);
      Alert.alert(error)
    });
    return user.name;
  }
    else{
      Alert.alert('Enter details to signup!')
    }
  }


  loginUser = (email, password) => {
    if(email && password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  else{
    Alert.alert('Enter details to login!')
  }
}

logoutUser = () =>{
  firebase.auth().signOut()
  .then(() => {
  console.log('Signed Out');
})
.catch(error=>{
 console.error('Sign Out Error', error);
});
}

