import { functions } from 'firebase'
import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {fcmService} from './FCMService'
import {localNotificationService} from './LocalNotificationService'

export default function Call() {

    useEffect(() => {
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)

        function onRegister(token) {
            console.log("[App] onRegister: ",token)
        }

        function onNotification(notify) {
            console.log("[App] onNotification: ",notify)
            const options = {
                soundName: 'default',
                playSound: true
            }
            localNotificationService.showNotifiaction(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify) {
            console.log("[App] onOpenNotification: ",notify)
            alert("Open Notification: " + notify.body)
        }

        return () => {
            console.log("[App] unRegister")
            fcmService.unRegister()
            localNotificationService.unRegister()
        }
    }, [])
return(<View></View>)

}