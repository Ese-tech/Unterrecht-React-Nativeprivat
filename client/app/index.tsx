import { useEffect } from "react";
import  router  from "expo-router";

export default function Index() {
  useEffect(() => {
    router.replace("/home");
    router.replace("/todos");
  }, []);
  return null;
}