import React from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as Google from 'expo-google-app-auth'
import { GoogleLogo } from '../assets/icons'
import { theme } from '../core/theme'
import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID } from '../core/config'

export default function GoogleLogin() {
  const signInWithGoogle = async () => {
    if (Platform.OS === 'web') {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      return
    }

    try {
      const result = await Google.logInAsync({
        clientId:
          Platform.OS === 'android'
            ? ANDROID_GOOGLE_CLIENT_ID
            : IOS_GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
      })
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        )
        await firebase.auth().signInWithCredential(credential)
      } else {
        alert('Something went wrong.')
      }
    } catch ({ message }) {
      alert(message)
    }
  }

  return (
    <TouchableOpacity onPress={signInWithGoogle} style={styles.container}>
      <GoogleLogo />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.google,
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
