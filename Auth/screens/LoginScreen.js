import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";
import { Alert } from "react-native";
import { useAuth } from "../store/auth-context";

function LoginScreen() {
  const { authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed!", "Could not log you in.");
      setIsLoading(false);
    }
  }
  if (isLoading) return <LoadingOverlay message="Logging in..." />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
