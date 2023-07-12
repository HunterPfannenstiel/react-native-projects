import { StyleSheet, View, Text, Alert } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

function LocationPicker({ onPickLocation }) {
  const [locationPermInfo, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState();
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    if (isFocused && params) {
      const mapPickedLocation = {
        latitude: params.latitude,
        longitude: params.longitude,
      };
      setLocation(mapPickedLocation);
      onPickLocation(mapPickedLocation);
    }
  }, [params, isFocused]);
  async function verifyPermissions() {
    if (locationPermInfo.status === PermissionStatus.UNDETERMINED) {
      const res = await requestPermission();
      return res.granted;
    }
    if (locationPermInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this feature."
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const location = await getCurrentPositionAsync();
    const loc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(loc);
    onPickLocation(loc);
  }
  function pickOnMapHandler() {
    navigate("Map");
  }
  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>
        {!location && <Text>Pick a location</Text>}
        {location && (
          <Text>
            Lat: {location.latitude} Long: {location.longitude}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {},
});
