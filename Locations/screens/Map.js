import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    longitude: route.params.longitude,
    latitude: route.params.latitude,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location by tapping on the map first"
      );
      return;
    }
    navigation.navigate("AddPlace", selectedLocation);
  }, [navigation, selectedLocation]);
  const region = {
    latitude: initialLocation?.latitude || 37.78,
    longitude: initialLocation?.longitude || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          onPress={saveLocationHandler}
          icon="save"
          color={tintColor}
          size={24}
        />
      ),
    });
  }, [navigation, saveLocationHandler]);

  function selectLocationHandler(event) {
    if (initialLocation) return;
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  }

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
