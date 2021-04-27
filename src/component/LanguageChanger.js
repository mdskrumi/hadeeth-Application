import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";

import LanguageContext from "../context/LanguageContext";

const LanguageChanger = () => {
  const refRBSheet = useRef();

  const LANGUAGE_OPTIONS = {
    ar: {
      code: "ar",
      native: "عربي",
    },
    bn: {
      code: "bn",
      native: "বাংলা ভাষা",
    },
    en: {
      code: "en",
      native: "English",
    },
    tr: {
      code: "tr",
      native: "Türkçe",
    },
    hi: {
      code: "hi",
      native: "हिन्दी",
    },
    id: {
      code: "id",
      native: "Indonesia",
    },
  };
  const langContext = useContext(LanguageContext);
  const renderImage = (lang) => {
    if (lang === "ar")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/ar.png")}
        />
      );
    else if (lang === "bn")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/bn.png")}
        />
      );
    else if (lang === "tr")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/tr.png")}
        />
      );
    else if (lang === "en")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/en.png")}
        />
      );
    else if (lang === "hi")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/hi.png")}
        />
      );
    else if (lang === "id")
      return (
        <Image
          style={styles.imageStyle}
          source={require("../../assets/id.png")}
        />
      );
  };

  const RenderSelectionList = () => {
    return (
      <FlatList
        data={Object.keys(LANGUAGE_OPTIONS)}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return item !== langContext.lang ? (
            <TouchableOpacity
              disabled={item === langContext.lang}
              style={
                index > 0
                  ? styles.languageListStyle
                  : styles.languageListStyleOne
              }
              onPress={() => {
                langContext.setLang(item);
                refRBSheet.current.close();
              }}
            >
              {renderImage(item)}
              <Text>{LANGUAGE_OPTIONS[item].native}</Text>
            </TouchableOpacity>
          ) : null;
        }}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <View style={styles.langChange}>
          {renderImage(langContext.lang)}
          <Text>{LANGUAGE_OPTIONS[langContext.lang].native}</Text>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <RenderSelectionList />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  langChange: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "contain",
    height: 10,
    width: 15,
    marginHorizontal: 10,
  },
  languageListStyleOne: {
    alignItems: "center",
    padding: 5,
    marginTop: 5,
  },
  languageListStyle: {
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    borderRadius: 35,
    padding: 5,
  },
});

export default LanguageChanger;
