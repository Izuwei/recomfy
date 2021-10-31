import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";

import TileGrid from "./TileGrid";
import colors from "../constants/colors";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = ({ navigation, route, initialRouteName, data }) => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: colors.red,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name={t("Films")}
        children={() => <TileGrid navigation={navigation} data={data.films} />}
      />
      <Tab.Screen
        name={t("Serials")}
        children={() => (
          <TileGrid navigation={navigation} data={data.serials} />
        )}
      />
      <Tab.Screen
        name={t("Books")}
        children={() => <TileGrid navigation={navigation} data={data.books} />}
      />
      <Tab.Screen
        name={t("Games")}
        children={() => <TileGrid navigation={navigation} data={data.games} />}
      />
      <Tab.Screen
        name={t("Anime")}
        children={() => <TileGrid navigation={navigation} data={data.anime} />}
      />
      <Tab.Screen
        name={t("Manga")}
        children={() => <TileGrid navigation={navigation} data={data.manga} />}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;
