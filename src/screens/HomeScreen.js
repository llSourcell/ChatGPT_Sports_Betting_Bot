import React from 'react'
import { View, StyleSheet } from 'react-native'
import Button from '../components/Button'
import TopBar from '../components/TopBar'

export default function HomeScreen({ navigation }) {


  const iframe = '<iframe src="https://mainnet.dexsport.io/" frameborder="0" style="width: 100%;" height="600"></iframe>'; 

    
  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }
  return (
    <>

<Iframe iframe={iframe} />,

      <TopBar title="Home" />
      <View style={styles.container}>
      NBA Winning Team Prediction for 1/18:22: 
      <br></br>
      - The Knicks will beat the Wizards
      <br></br>
      - The Mavericks will beat the Hawks
      <br></br>
      - The Rockets will beat the Hornets
      <br></br>
      - The Grizzlies will beat the Cavaliers
      <br></br>
      - The Pelicans will beat the Heat
      <br></br>
      - The Thunder will beat the Pacer
      <br></br>
      - The Jazz will beat the Clippers
      <br></br>
      - The Nuggets will beat the Timberwolves
      <br></br>
      - The Lakers will beat the Kings. 
      
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
