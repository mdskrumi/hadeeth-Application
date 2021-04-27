import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LanguageProvider } from "./src/context/LanguageContext";

import LanguageChanger from "./src/component/LanguageChanger";

import HomeScreen from "./src/screens/HomeScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Home",
      headerRight: () => {
        return <LanguageChanger />;
      },
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};
