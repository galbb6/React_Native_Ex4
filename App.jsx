import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/components/AppNavigator";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./theme.json";
import { NotesContext } from "./src/components/Context";
import { useState } from "react";

export default function App() {

  const [notes, setNotes] = useState({});

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NotesContext.Provider value={{notes, setNotes}}>
        <AppNavigator />
      </NotesContext.Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
