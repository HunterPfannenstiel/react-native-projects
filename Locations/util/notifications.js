import * as Notifications from "expo-notifications";

export const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync();
};

export function sendPushNotificationHandler(
  to = "ExponentPushToken[abc]", //fake key, replace with real
  title,
  body
) {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify({ to, title, body }),
    headers: { "Content-Type": "application/json" },
  });
}
