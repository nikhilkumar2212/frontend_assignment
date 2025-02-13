import React from "react";
import { View, Text, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Real Estate App  "Just click login button because app is in developing phase"</Text>
      <Button title="Login" onPress={() => navigation.replace("Home")} />
    </View>
  );
};

export default LoginScreen;
