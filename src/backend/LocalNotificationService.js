import PushNotification from "react-native-push-notification";

class LocalNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.createChannel(
            {
              channelId: "hms-channel-id", // (required)
              channelName: "HMS", // (required)
              //channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              //importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );

          PushNotification.getChannels(function (channel_ids) {
            console.log(channel_ids); // ['channel_id_1']
          });

        PushNotification.configure({
            onRegister : function (token) {
                console.log("[LocalNotificationService] onRegister:", token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:", notification);
                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(notification.data);
            },
            popInitialNotification: true,
            requestPermissions:true,
        })
    }

    unRegister = () => {
        PushNotification.unRegister()
    }
    

    showNotification = (id,title,message,data = {} , options = {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id,title,message,data , options),
            title: title || "This is title",
            message: message || "This is message",
            channelName: "HMS",
            channelId: "hms-channel-id", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
            playSound: options.playSound || true,
            actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
            repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            userInteraction: false //Boolean: if the notification was opened by the user from the notification area or not
        });
    }

    buildAndroidNotification = (id,title,message,data = {} , options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data,
        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID: ",notificationId);
        PushNotification.cancelAllLocalNotifications({id: '${notificationId}'})
    }

    scheduleNotifications = (msg,year, month, date, hours, minutes, seconds, ms) => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: msg, // (required)
            channelName: "HMS",
            channelId: "hms-channel-id",
            // date: new Date(Date.now() + 10 * 1000), // in 10 secs
            //The year must have 4 digits: 2013 is okay, 98 is not.
            //The month count starts with 0 (Jan), up to 11 (Dec).
            //The date parameter is actually the day of month, if absent then 1 is assumed.
            //If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.
            //Format: new Date(year, month, date, hours, minutes, seconds, ms)
            date: new Date(year, month, date, hours, minutes, seconds, ms),
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          });
    }
}

export default localNotificationService = new LocalNotificationService()