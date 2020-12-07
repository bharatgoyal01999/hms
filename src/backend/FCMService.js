import messaging from '@react-native-firebase/messaging';

class FCMService {

    register = (onRegister, onNotification , onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification , onOpenNotification)
    }

    registerAppWithFCM = async() => {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true)
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
                this.getToken(onRegister)
            }
            else {
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.log("[FCMService] Permission Rejected",error)
        })
    }

    getToken = (onRegister) => {
        messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                onRegister(fcmToken)
            }
            else {
                console.log("[FCMService] User does not have a device token")
            }
        }).catch(error => {
            console.log("[FCMService] getToken rejected",error)
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.log("[FCMService] Request Permission Rejected",error)
        })
    }

    deleteToken = () => {
        console.log("[FCMService] delete Token")
        messaging().deleteToken()
        .catch(error => {
            console.log("[FCMService] Delete Token Error",error)
        })
    }

    createNotificationListeners = (onRegister, onNotification , onOpenNotification) => {
        //when the application is running, but in the background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] onNotificationOpenedApp Notification caused app to open from background ", remoteMessage)
            if(remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });
        //when the application is opened from a quit state
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log("[FCMService] onNotificationOpenedApp Notification caused app to open from background ",remoteMessage)
            if(remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });
        //foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] A new FCM Service arrived!", remoteMessage);
            if(remoteMessage) {
                let notification = null
                notification = remoteMessage.notification
                onNotification(notification)
            }
        });
        //triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] New Token Refresh ", fcmToken)
            onRegister(fcmToken)
        })
    }

    unRegister = () => {
        this.messageListener()
    }
}

export default fcmService = new FCMService()