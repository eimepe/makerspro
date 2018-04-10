import React from 'react';
import {AsyncStorage, Button, StyleSheet, View, Text, TextInput, ToastAndroid, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27


 export default class loginView extends React.Component {
   static navigationOptions = {
     header: null
   }

   constructor(props) {
     super(props);
     this.state = {isShowingText: true, nombre:'', apellido:'',codigo:'',platino: '',telefono:'', user: '', password: '', myKey: null};

     // Toggle the state every second
     /*setInterval(() => {
     this.props.navigation.navigate('Home')
  }, 5000);*/
   }


   alertItemName = (nombre,apellido, codigo, platino,telefono, user, password) => {

     console.log(JSON.stringify({
       usuario: user,
       clave: password,
     }));

      return fetch('http://makerspro.com.co/registro.php',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          codigo: codigo,
          platino: platino,
          telefono: telefono,
          usuario: user,
          clave: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

if(responseJson.success==1){

ToastAndroid.showWithGravityAndOffset(
'Se ha Registrado Correctamente. Su solicitud esta en proceso de activacion',
ToastAndroid.LONG,
ToastAndroid.BOTTOM,
25,
50
);
this.props.navigation.navigate('Login');
            }else{
              ToastAndroid.showWithGravityAndOffset(
  'Su codigo ya esta Registrado por favor inicie sesion',
  ToastAndroid.LONG,
  ToastAndroid.BOTTOM,
  25,
  50
);
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
      <ScrollView>
<View style={{alignItems:'center', marginBottom: 40, marginTop: 60}}>
          <Image   source={require('../makers.png')} />
          </View>



            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Nombre"
               placeholderTextColor = "#333333"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({nombre: text})}
               />
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Apellido"
                  placeholderTextColor = "#333333"
                  autoCapitalize = "none"
                  onChangeText={(text) => this.setState({apellido: text})}
                  />
                  <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "Codigo"
                     placeholderTextColor = "#333333"
                     autoCapitalize = "none"
                     onChangeText={(text) => this.setState({codigo: text})}
                     />
                     <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Platino"
                        placeholderTextColor = "#333333"
                        autoCapitalize = "none"
                        onChangeText={(text) => this.setState({platino: text})}
                        />
                        <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Telefono"
                           placeholderTextColor = "#333333"
                           autoCapitalize = "none"
                           onChangeText={(text) => this.setState({telefono: text})}
                           />
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
                             onPress={() => this.alertItemName(this.state.nombre, this.state.apellido, this.state.codigo, this.state.platino, this.state.telefono, this.state.user, this.state.password)}
                            >
                              <Text style = {styles.submitButtonText}> Registrarse </Text>
                           </TouchableOpacity>

                           <TouchableOpacity
                                          style = {styles.Register}
                                         onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                          <Text style = {styles.RegisterText}> Iniciar sesion </Text>
                                       </TouchableOpacity>
                                       </ScrollView>

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
   submitButton: {
      backgroundColor: '#f50202',
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
      width: 150,
      margin: 15,
      height: 40,
   },
   Register: {

      width: 150,
      margin: 15,
      height: 40,
      color: '#3083f2',
   },
   RegisterText:{
     alignContent: 'center',
      color: '#3083f2'
   },
   submitButtonText:{
     alignContent: 'center',
      color: 'white'
   }
})
