import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import TouchID from 'react-native-touch-id'

export default function App() {
const [isAuth,setIsAuth]=useState(false)

const optionalConfigObject = {
  title: 'Provide Your FingerPrint', // Android
  imageColor: '#e006', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Press sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

useEffect(()=>{
  handleBiometric()
})

const handleBiometric=()=>{
  TouchID.isSupported(optionalConfigObject).then(biometryType=>{
    if (biometryType === 'FaceID') {
      console.log('FaceID is supported.');
  } else {
      console.log('TouchID is supported.');
      if(isAuth){
        return null
      }
     TouchID.authenticate('',optionalConfigObject)
      .then(success=>{
        console.log('Success',success)
        setIsAuth(success)
      })
      .catch(err=>{
        BackHandler.exitApp();
      })
  }
  })
}

  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:30,fontWeight:'600'}}>FingerPrint Authentication</Text>
    </View>
  )
}