import React, { Component } from 'react';
import {BackHandler,ToastAndroid, PermissionsAndroid, ScrollView, AppRegistry,ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
var array1 = [];
export default class listVideoview extends Component {


  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: params ? params.title : 'A Nested Details Screen',
      }
    };



  constructor(props) {
    super(props);
    this.state = {data: [], isLoading: true, videos: [], videoss: [], estadodescargar: 0};

    // Toggle the state every second
    /*setInterval(() => {
    this.props.navigation.navigate('Home')
 }, 5000);*/
  }

  getdatosweb(){

    this.setState({isLoading: true, data: [], videos: [], videoss: []});
    return fetch('http://test.makerspro.com.co/videos.php?ultcategoria='+this.props.navigation.state.params.ultcategoria
    +'&subcategoria='+this.props.navigation.state.params.subcategoria
    +'&categoria='+this.props.navigation.state.params.categoria)
      .then((response) => response.json())
      .then((responseJson) => {
          context = this;


          var i;
          for (i = 0; i < responseJson.length; i++) {


            this.getinfoVideo(responseJson[i], context, responseJson.length);

          }
            this.setState({isLoading: false});


      })
      .catch((error) => {
        console.error(error);
      });
  }



  componentDidMount() {

this.getdatosweb();


  }


  async  requestCameraPermission(item) {

           const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
           if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
               alert('con permisos');
           } else {
             console.log('sin permisos');
               try {
                   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                       {
                           'title': 'Esta aplicacion requiere permisos',
                           'message': 'Para guardar videos en tu dispositivo.'
                       }
                   )
                   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                      this.getDescargar(item);
                    } else {
                      return false;
                    }



               } catch (err) {
                   alert(err)
               }
           }

}


getData = (item) => {

  this.props.navigation.navigate('Video', {
                itemId: item.publisher,
                title: item.name,
                estado: item.estado,
              })

 }



    alertItemName = (item) => {
      this.getData(item);
    //this.requestCameraPermission(item);
     }

     Descargar = (item) => {

     this.requestCameraPermission(item);
      }


      getDescargar = (item) => {

        if(item.estado == 1){
          RNFetchBlob.fs.unlink('/data/user/0/com.eider.eimepe.makerspro/files/'+item.name)
          .then(() => {
            this.getdatosweb();
            ToastAndroid.showWithGravityAndOffset(
            'Eliminado correctamente',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
            );
          })
          .catch((err) => { console.error(error) })
        }else{

          ToastAndroid.showWithGravityAndOffset(
          'Descargando... ',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
          );

          let dirs = RNFetchBlob.fs.dirs;
           RNFetchBlob
           .config({
             fileCache : true,
             // by adding this option, the temp files will have a file extension
             appendExt : 'mp4',
             path : dirs.DocumentDir + '/'+ item.name
           })
           .fetch('GET', 'http://makerspro.com.co/admin/web/archivos/'+item.name, {
             //some headers ..
           })
           .progress((received, total) => {
            console.log('progress', received / total)

           })
           .then((res) => {
             // the temp file path with file extension `png`
           //  console.log('The file saved to ', res)
           this.getdatosweb();

             ToastAndroid.showWithGravityAndOffset(
             'Descargado correctamente',
             ToastAndroid.LONG,
             ToastAndroid.BOTTOM,
             25,
             50
             );
             // Beware that when using a file path as Image source on Android,
             // you must prepend "file://"" before the file path

           })


        }






       }


  getinfoVideo(item, context, largo){

       RNFetchBlob.fs.exists('/data/user/0/com.eider.eimepe.makerspro/files/'+item.name)
       .then((exist) => {
        if (exist) {
        //  console.log(item);
        var video = eval("("+JSON.stringify(item).replace('}', ', estado: "1" }')+")");
        context.state.videos.push(video);


        }else {

          var video = eval("("+JSON.stringify(item).replace('}', ', estado: "2" }')+")");
          context.state.videos.push(video);


        }
if(this.state.videos.length == largo){
context.setState({videoss: this.state.videos, estadodescargar: 1});

}

       })
       .catch(() => { console.log('error'); })
     }

     componentDidUpdate(){
       console.log("edirtas");
   console.log(this.state.videoss);
     }










  render() {

    if(this.state.isLoading){
     return(
       <View style={{flex: 1, padding: 20}}>
         <ActivityIndicator/>
       </View>
     )
   }

   let datares =  this.state.videoss.map((item, index) => (
       <TouchableOpacity
           key = {item.publisher}
           style = {styles.container}
           onPress = {() => this.alertItemName(item)}>
           <TouchableOpacity onPress = {() => this.Descargar(item)}>

            {item.estado == 1 ? <Image style={{width: 30, height:30, marginTop: 10}} source={{uri: 'http://makerspro.com.co/admin/web/archivos/canceldescargar.png'} }/> : <Image style={{width: 30, height:30, marginTop: 10}} source={{uri: 'http://makerspro.com.co/admin/web/archivos/descargar.png'} }/> }

           </TouchableOpacity>
           <Image style={{width: 50, height:50}} source={{uri: item.image} }/>
           <Text style = {styles.text}>
              {item.name.replace(/_/g, " ") }
           </Text>

        </TouchableOpacity>
     ));

    return (
      <View style={{margin:10}}>
      <ScrollView>


{datares}

                  </ScrollView>
               </View>
    );
  }
}

const styles = StyleSheet.create ({
      container: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      marginTop: 0,
      backgroundColor: '#eeeeee',

   },
   text: {
     marginLeft: 5,
     padding: 10,
     fontFamily: "caviar",
     fontSize: 16,
      color: '#333333'
   },
   textd: {
     marginLeft: 5,
     padding: 10,
     fontFamily: "caviar",
     backgroundColor: '#e81c00',
     borderRadius: 10,
     fontSize: 16,
      color: '#333333'
   }
})
