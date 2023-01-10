import React from 'react'
import { View, StyleSheet } from 'react-native'
import { logoutUser } from '../api/auth-api'
import Button from '../components/Button'
import TopBar from '../components/TopBar'

export default function ProfileScreen() {
  return (
    <>
      <TopBar title="Profile" />
      <View style={styles.container}>
        <Button mode="contained" onPress={logoutUser} style={{ width: 120 }}>
          Logout
        </Button>
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
