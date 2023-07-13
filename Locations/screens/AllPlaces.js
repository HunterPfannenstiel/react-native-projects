import { Button, StyleSheet, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import * as Notifications from "expo-notifications";
import {
  allowsNotificationsAsync,
  requestPermissionsAsync,
  sendPushNotificationHandler,
} from "../util/notifications";

function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function getPlaces() {
      const places = await fetchPlaces();
      setPlaces(places);
    }
    getPlaces();
  }, [isFocused]);

  async function scheduleNotificationHandler() {
    const hasPushNotificationPermissionGranted =
      await allowsNotificationsAsync();

    if (!hasPushNotificationPermissionGranted) {
      await requestPermissionsAsync();
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New Notif!",
        body: "Hello, can you see me?",
        data: { userName: "hpfan" },
      },
      trigger: { seconds: 1 },
    });
  }

  return (
    <>
      <PlacesList places={places} />
      <Button
        title="Schedule Notificaiton"
        onPress={sendPushNotificationHandler.bind(
          null,
          undefined,
          "HI",
          "EEEE"
        )}
      />
    </>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  container: {},
});
