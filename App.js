import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27

import loginView from './components/loginView';
import homeView from './components/homeView';
import inicioView from './components/inicioView';
import subCategoria from './components/subCategoria';
import videoView from './components/videoView';
import listVideoview from './components/listVideoView';
import ultCategoria from './components/ultCategoria';
import AsyncStorageExample from './components/AsyncStorageExample';
import registerview from './components/registerView';
import librosview from './components/listLibrosView';

const RootStack = StackNavigator(
  {
    Home: {
      screen: homeView,
    },
    Login: {
      screen: loginView,
    },
    Inicio: {
      screen: inicioView,
    },
    Subcategoria: {
      screen: subCategoria,
    },
    Ultcategoria: {
      screen: ultCategoria,
    },
    Video: {
      screen: videoView,
    },
    Asyncd: {
      screen: AsyncStorageExample,
    },
    listVideo: {
      screen: listVideoview,
    },
    Register: {
      screen: registerview,
    },
    Libros: {
      screen: librosview,
    },

  },
  {
    initialRouteName: 'Inicio',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white'
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
