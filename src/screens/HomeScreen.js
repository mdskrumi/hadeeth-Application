import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import MMKVStorage from "react-native-mmkv-storage";

import LanguageContext from "../context/LanguageContext";

import PageLoader from "../component/PageLoader";

import hadeethenc from "../api/HadeethEnc";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
// const WIDTH = Dimensions.get("screen").width;

const HomeScreen = () => {
  const langContext = useContext(LanguageContext);
  const [hadeeth, setHadeeth] = useState([]);

  useEffect(() => {
    const MMKV = new MMKVStorage.Loader().initialize();
    const checkLanguageSetting = async () => {
      const lang = await MMKV.getStringAsync("lang");
      if (!lang) {
        await MMKV.setStringAsync("lang", "bn");
        langContext.setLang("bn");
      } else {
        langContext.setLang(lang);
      }
    };
    checkLanguageSetting();
  }, []);

  useEffect(() => {
    const getHadeeths = async () => {
      setHadeeth([]);
      const resposne = await hadeethenc(
        `/categories/roots/?language=${langContext.lang}`,
        {
          method: "GET",
        }
      );
      const data = await resposne.json();
      setHadeeth(data);
    };
    getHadeeths();
  }, [langContext]);

  return hadeeth && hadeeth.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        data={hadeeth}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{`${item.title}`}</Text>
            </View>
          );
        }}
      />
    </View>
  ) : (
    <PageLoader />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  listItem: {
    backgroundColor: "green",
    margin: 10,
    width: WIDTH * 0.4,
    padding: 15,
    borderRadius: 35,
  },
  listItemText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },
});

export default HomeScreen;
