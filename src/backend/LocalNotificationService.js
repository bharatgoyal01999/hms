import PushNotification from "react-native-push-notification";

class LocalNotificationService {
    configure = (onOpenNotification) => {
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
            title: title || "",
            message: message || "",
            playSound: options.playSound || true,
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
            //eg. date: new Date(Date.now() + 10 * 1000), // in 10 secs
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

export const LocalNotificationService = new LocalNotificationService()