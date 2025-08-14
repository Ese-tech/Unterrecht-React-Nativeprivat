import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    // Replace the current route with "home"
    navigation.replace("home");
  }, [navigation]);

  return null;
}