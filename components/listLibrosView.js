import React, { Component } from 'react';
import {BackHandler, Linking, ScrollView, AppRegistry,ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class listVideoview extends Component {


  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: params ? params.title : 'A Nested Details Screen',
      }
    };



  constructor(props) {
    super(props);
    this.state = {data: [], isLoading: true};

    // Toggle the state every second
    /*setInterval(() => {
    this.props.navigation.navigate('Home')
 }, 5000);*/
  }



  componentDidMount() {



    return fetch('http://test.makerspro.com.co/libros.php?ultcategoria='+this.props.navigation.state.params.ultcategoria
    +'&subcategoria='+this.props.navigation.state.params.subcategoria
    +'&categoria='+this.props.navigation.state.params.categoria)
      .then((response) => response.json())
      .then((responseJson) => {
      this.setState({data:responseJson, isLoading: false})
      console.log(responseJson);


      })
      .catch((error) => {
        console.error(error);
      });




  }





    alertItemName = (item) => {
  Linking.openURL(item.url)
     }

  render() {
    if(this.state.isLoading){
     return(
       <View style={{flex: 1, padding: 20}}>
         <ActivityIndicator/>
       </View>
     )
   }
    return (
      <View style={{margin:30}}>
      <ScrollView>
                  {
                     this.state.data.map((item, index) => (
                        <TouchableOpacity
                           key = {item.publisher}
                           style = {styles.container}
                           onPress = {() => this.alertItemName(item)}>

                           <Image
          style={{width: 50, height: 50}}
          source={{uri: item.image} }
        />

                           <Text style = {styles.text}>
                              {item.name.replace(/_/g, " ")}
                           </Text>
                        </TouchableOpacity>
                     ))
                  }

                  </ScrollView>
               </View>
    );
  }
}

const styles = StyleSheet.create ({
   container: {

      flex: 1,
      flexDirection: 'row',
      padding: 10,
      marginTop: 0,
      backgroundColor: '#eeeeee',

   },
   text: {
     marginLeft: 10,
     padding: 10,
     fontFamily: "caviar",
     fontSize: 16,
      color: '#333333'
   }
})
