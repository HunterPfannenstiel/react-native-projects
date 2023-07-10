import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const { token } = useAuth();
  useEffect(() => {
    async function getMessage() {
      try {
        const res = await fetch(
          `https://react-native-expense-fa86e-default-rtdb.firebaseio.com/message.json?auth=${token}`
        );
        const data = await res.json();
        setFetchedMessage(data);
      } catch (error) {}
    }
    getMessage();
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      {fetchedMessage && <Text>{fetchedMessage}</Text>}
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
