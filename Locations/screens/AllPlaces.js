import { StyleSheet, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

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

  return <PlacesList places={places} />;
}

export default AllPlaces;

const styles = StyleSheet.create({
  container: {},
});
