import React, {Component} from 'react';
import {
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
  Button,
  AsyncStorage,
  ScrollView,
  AppRegistry,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput
} from 'react-native';

export default class inicioView extends Component {

  static navigationOptions = {
    headerLeft: null,
    title: "Sistema de aprendizaje"
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datos: '5',
      main: 'Inicio',
      isLoading: true,
      modalVisible: false,
      password: ''
    };

    // Toggle the state every second
    /*setInterval(() => {
    this.props.navigation.navigate('Home')
 }, 5000);*/

  }

  inicior() {
    return fetch('http://test.makerspro.com.co/feed.php').then((response) => response.json()).then((responseJson) => {
      this.setState({data: responseJson, isLoading: false})

    }).catch((error) => {
      console.error(error);
    });

  }

  onBackButtonPressAndroid = () => {
    console.log(this.props.navigation.state.routeName);
  };

  verificar() {
    this.getKey();
  }

  async getKey() {
    console.log('buscando');
    try {

      const value = await AsyncStorage.getItem('user');
      const logs = JSON.parse(value);
      console.log(logs);

      if (logs != null) {

        return fetch('http://makerspro.com.co/estado.php?id=' + logs.idmsql).then((response) => response.json()).then((responseJson) => {

          if (responseJson.success == 1) {
            console.log('logeado');
          } else {
            this.resetKey();
          }

        }).catch((error) => {
          console.error(error);
        });

      } else {
        this.redirect2();
        console.log('hola');
      }

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  redirect2() {
    this.props.navigation.navigate('Login')
  }

  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

setLideres(){
  this.props.navigation.navigate('listVideo', {
    ultcategoria: 0,
    subcategoria: 0,
    categoria: 5,
    title: "Lideres"
  });
  this.setModalVisible(!this.state.modalVisible);
}

  async resetKey() {
    try {
      await AsyncStorage.removeItem('user');
      const value = await AsyncStorage.getItem('honor');
      console.log(value);
      this.redirect2();
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  componentDidMount() {
    this.verificar();

    this.inicior();

  }

  componentWillUnmount() {}

  alertItemName = (item) => {
    if (item.publisher <= 2) {
      this.props.navigation.navigate('Subcategoria', {
        itemId: item.publisher,
        title: item.name
      })

    } else if(item.publisher == 5) {
   this.setModalVisible(true);
 }else if(item.publisher == 3) {
   this.props.navigation.navigate('Libros', {
     ultcategoria: 0,
     subcategoria: 0,
     categoria: item.publisher,
     title: item.name
   })
    }else{

      this.props.navigation.navigate('listVideo', {
        ultcategoria: 0,
        subcategoria: 0,
        categoria: item.publisher,
        title: item.name
      })
    }

  }

  render() {
    if (this.state.isLoading) {
      return (<View style={{
          flex: 1,
          padding: 20
        }}>
        <ActivityIndicator/>
      </View>)
    }
    return (<View style={{
        margin: 30
      }}>
      <Modal
          style={{width: 50, height: 50, }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Ingresar contraseña"
               placeholderTextColor = "#333333"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({password: text})}
               />



              <TouchableHighlight
              style={styles.submitButtonaceptar}
                onPress={() => {
                  if(this.state.password == "1906257378"){
                    this.setLideres();
                    //this.setModalVisible(!this.state.modalVisible);
                  }

                }}>
                <Text style={styles.submitButtonTextaceptar}>Acaptar</Text>
              </TouchableHighlight>

              <TouchableHighlight
              style={styles.submitButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.submitButtonText}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      <ScrollView>
        {
          this.state.data.map((item, index) => (
            <TouchableOpacity
             key={item.publisher}
              style={styles.container}
              onPress= {() => this.alertItemName(item)}>

            <Image style={{width: 50,height: 50}} source={{uri: item.image}}/>

            <Text style={styles.text}>
              {item.name}
            </Text>
          </TouchableOpacity>))
        }

      </ScrollView>

    </View>);
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginTop: 0,
    backgroundColor: '#eeeeee'
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#222222',
     borderRadius: 4,
     borderWidth: 1
  },
  text: {
    marginLeft: 10,
    padding: 10,
    fontFamily: "caviar",
    fontSize: 16,
    color: '#333333'
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
  ,
  submitButtonaceptar: {
     backgroundColor: '#237a39',
     padding: 10,
     borderRadius: 4,
     alignItems: 'center',
     width: 150,
     margin: 15,
     height: 40,
  },
  submitButtonTextaceptar:{
    alignContent: 'center',
     color: 'white'
  }
})
