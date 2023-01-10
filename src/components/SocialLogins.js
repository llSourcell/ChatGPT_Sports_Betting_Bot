import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import FacebookLogin from './FacebookLogin'
import GoogleLogin from './GoogleLogin'

export default function SocialLogins() {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>Or connect using</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <GoogleLogin />
        <FacebookLogin />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    position: 'relative',
    width: '96%',
    height: 1,
    backgroundColor: theme.colors.text,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerText: {
    position: 'absolute',
    backgroundColor: theme.colors.tint,
    fontSize: 13,
    color: theme.colors.text,
    padding: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
})
