import { Alert } from "react-native";
import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../store/auth-context";

function SignupScreen() {
  const { authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed!", "Could not sign you up.");
      setIsLoading(false);
    }
  }
  if (isLoading) return <LoadingOverlay message="Creating account..." />;
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
