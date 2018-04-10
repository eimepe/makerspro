import React, { Component } from 'react';
import {ScrollView, AppRegistry,ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class subCategoria extends Component {


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
    return fetch('http://test.makerspro.com.co/feedsub.php?id='+this.props.navigation.state.params.itemId+'')
      .then((response) => response.json())
      .then((responseJson) => {
      this.setState({data:responseJson, isLoading: false})
      console.log(this.props.navigation.state.params.itemId);
      })
      .catch((error) => {
        console.error(error);
      });




  }





    alertItemName = (item) => {
      if(item.tipo!=2){
        this.props.navigation.navigate('listVideo', {
                      ultcategoria: 0,
                      subcategoria: item.publisher,
                      categoria: 0,
                      title: item.name
                    })
      }else{
        this.props.navigation.navigate('Ultcategoria', {
                      itemId: item.publisher,
                      title: item.name,
                    })
      }

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
                              {item.name}
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
