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
      //pull predictions from PyTorch Model, running Flask
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
