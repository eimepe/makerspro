import React from 'react';
import {StyleSheet, View, Text, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import VideoPlayer from 'react-native-video-controls';
import KeepAwake from 'react-native-keep-awake';

export default class videoView extends React.Component {

  static navigationOptions = {
    header: null
  }






  render() {

    if (this.props.navigation.state.params.estado == 1) {
      console.log("existe");
      return (
        <View style={{flex: 1}}>
        <KeepAwake />
        <VideoPlayer
          source={{ uri: '/data/user/0/com.eider.eimepe.makerspro/files/'+this.props.navigation.state.params.title }}
          navigator={ this.props.navigation }
          controlTimeout={ 15000 }
        />

        </View>
      )
    }else{
      console.log("existe no");
      return (
        <View style={{flex: 1}}>
        <KeepAwake />
        <VideoPlayer
          source={{ uri: 'http://makerspro.com.co/admin/web/archivos/'+this.props.navigation.state.params.title }}
          navigator={ this.props.navigation }
          controlTimeout={ 15000 }
        />

        </View>
      )
    }

  }


}



var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
