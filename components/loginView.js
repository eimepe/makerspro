import React from 'react';
import {AsyncStorage, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27


 export default class loginView extends React.Component {
   static navigationOptions = {
     header: null
   }

   constructor(props) {
     super(props);
     this.state = {isShowingText: true, user: '', password: '', myKey: null};

     // Toggle the state every second
     /*setInterval(() => {
     this.props.navigation.navigate('Home')
  }, 5000);*/
   }


   alertItemName = (user, password) => {

     console.log(JSON.stringify({
       usuario: user,
       clave: password,
     }));

      return fetch('http://makerspro.com.co/login.php',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: user,
          clave: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

if(responseJson.success==1){
              this.saveKey(JSON.stringify(responseJson))
              this.redirect();
            }else{
              console.log("error");
            }


        })
        .catch((error) => {
          console.error(error);
        });

    }

redirect(){
  this.props.navigation.navigate('Home')
}



    async saveKey(value) {



                try {
                  await AsyncStorage.setItem('user', value);
                } catch (error) {
                  console.log("Error saving data" + error);
                }



    }










    componentWillMount(){


    }


  render() {
    return (
      <View style = {styles.container}>
<View style={{alignItems:'center', marginBottom: 40, marginTop: 60}}>
          <Image   source={require('../makers.png')} />
          </View>



            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Usuario"
               placeholderTextColor = "#333333"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({user: text})}
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Contraseña"
               placeholderTextColor = "#333333"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({password: text})}
               />




               <TouchableOpacity
                              style = {styles.submitButton}
                             onPress={() => this.alertItemName(this.state.user, this.state.password)}
                            >
                              <Text style = {styles.submitButtonText}> Iniciar sesion </Text>
                           </TouchableOpacity>

                           <TouchableOpacity
                                            style = {styles.Register}
                                         onPress={() => this.props.navigation.navigate('Register')}
                                        >
                                          <Text style = {styles.RegisterText}> Registrarse </Text>
                                       </TouchableOpacity>

         </View>
    );
  }


}




const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 23,
      alignContent: 'center'
   },
   textRe:{
     color: '#3083f2',
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#222222',
      borderRadius: 4,
      borderWidth: 1
   },
   Register: {
      width: 150,
      margin: 15,
      height: 40,

   },
   RegisterText:{
     alignContent: 'center',
      color: '#3083f2'
   },
   submitButton: {
      backgroundColor: '#f50202',
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
      width: 150,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
     alignContent: 'center',
      color: 'white'
   }
})
