import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [placeDetails, setPlaceDetails] = useState();
  const selectedPlace = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
      const res = await fetchPlaceDetails(selectedPlace);
      setPlaceDetails(res);
      navigation.setOptions({ title: res.title });
    }
    loadPlaceData();
  }, [selectedPlace]);

  function showOnMapHandler() {
    navigation.navigate("Map", placeDetails.location);
  }
  if (!placeDetails) return <ActivityIndicator size={24} color="white" />;
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
