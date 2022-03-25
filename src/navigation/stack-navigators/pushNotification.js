import PushNotification from 'react-native-push-notification';

export const showLocalNotification = (number: string, message: string) => {
    console.log('notify');
  var incomingText = "Incoming Call:"
   PushNotification.localNotification({
     autoCancel: true,
     largeIcon: "ic_launcher",
     smallIcon: "ic_notification",
     bigText: `${message}:${number}`,
     subText: "AI 5",
     channelId: 'channel-id',
     color: "green",
     ignoreInForeground: false,
     priority: 'high',
     vibrate: true,
     vibration: 300,
     title: "AI 5",
     message: `${message}:${number}`,
     playSound: true,
     soundName: 'default',
     actions: '["Accept", "Reject"]',
   });
  };
  