import React from 'react';
import {Button, AsyncStorage, View, Text, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class homeView extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount(){

  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ScrollView>
        <Text style={{fontFamily: "caviar", fontSize: 14, marginBottom: 20}}>Bienvenido (a)
Construir un negocio de network marketing a nivel internacional es un desafío de liderazgo y una meta muy poderosa, inicias un proceso de aprendizaje AUTONOMO y de desiciones grandes .
Con la ayuda de tu equipo de apoyo podrás comprender la forma y tener la visión correcta de la construcción de tu imperio.
Mantente en aprendizaje,  toma acción y asesorate de tu líder constructor
Ahora hacer parte de la organización  MAKERS PRO  y con nuestras herramientas y formas de apalancamiento podrás extender tu negocio a nivel mundial .
Hoy emprender no es una opción es un deber las situaciones económicas de cada familia, de cada comunidad, de cada país son consecuencia de una educación promedio sin valores, conflictiva y creada para tener a las masas sin dirección y sin ganas de éxito por eso CONECTATE a nuestro SISTEMA EDUCATIVO sin excusas.
Educarse con propósito y con fe produce esperanza, si cambias tu mente cambian tus resultados sólo Mantén viva la promesa de una vida diferente sin problemas de escaces,  sólo abundancia adquiere la consciencia necesaria y disfruta de el proceso.

ENTRENATE...</Text>
        <Button
          title="Continuar"
          backgroundColor='red'
          onPress={() => this.props.navigation.navigate('Inicio')}

        />
        </ScrollView>
      </View>
    );
  }
}
