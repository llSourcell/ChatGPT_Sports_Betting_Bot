import React from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as Facebook from 'expo-facebook'
import { FacebookIcon } from '../assets/icons'
import { theme } from '../core/theme'
import { FACEBOOK_APP_ID } from '../core/config'

export default function FacebookLogin() {
  const signInWithFacebook = async () => {
    if (Platform.OS === 'web') {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
      return
    }

    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      })
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      })
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        await firebase.auth().signInWithCredential(credential)
      } else {
        alert('Something went wrong.')
      }
    } catch ({ message }) {
      alert(message)
    }
  }

  return (
    <TouchableOpacity onPress={signInWithFacebook} style={styles.container}>
      <FacebookIcon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.facebook,
    backgroundColor: theme.colors.surface,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
})
