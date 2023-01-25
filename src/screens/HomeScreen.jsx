import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState,useContext } from "react";
import { TextInput } from "@react-native-material/core";
import CategoryNotes from "../components/CategoryNotes";
import { Layout } from "@ui-kitten/components";
import { Button, Card, Modal, Input } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/Ionicons";
import { NotesContext } from "../components/Context";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [numberOfNotes, setNumberOfNotes] = useState(0);
  const notesContext = useContext(NotesContext);
  function addComponent() {
    setAllCategories((prevComponents) => [
      ...prevComponents,
      <CategoryNotes
        numberOfNotes={(notesContext.notes[categoryInputValue] == 0 || notesContext.notes[categoryInputValue]== undefined)  ?0 :notesContext.notes[categoryInputValue].length  }
        categoryName={categoryInputValue}
        key={prevComponents.length}
        onPress={() => navigation.navigate("Notes", { categoryName: categoryInputValue,numberOfNotes:numberOfNotes  })}
      />,
    ]);
    setVisible(false);
    setCategoryInputValue("");
  }

  return (
    <Layout style={{ flex: 1, alignItems: "center", backgroundColor: "#223" }}>
      <View style={styles.container}>
        <Text style={styles.header}>My Notes</Text>
        <View
          style={{
            width: "65%",
            alignSelf: "center",
            marginRight: 45,
            top: -100,
            marginTop: 10
          }}
        >
          <TouchableOpacity style={{ width: 400, alignItems: "flex-end" }}>
            <Icon
              onPress={() => setVisible(true)}
              style={{ paddingLeft: 20, paddingTop: 10 }}
              name="md-add"
              size={80}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View>

          <View style={{ position: "absolute", marginTop: 200 }}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={visible}
              onBackdropPress={() => setVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#000000aa",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    padding: 40,
                    margin: 50,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                    Create new subject
                  </Text>
                  <TextInput
                    placeholder="Subject Name"
                    required
                    onChangeText={(text) => setCategoryInputValue(text)}
                  />
                  <View style={{ flexDirection: "row", width: 200 }}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                      <Text style={{ paddingTop: 20 }}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={{ marginLeft: 120, paddingTop: 20 }}
                        onPress={addComponent}
                      >
                        Create
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          {allCategories.map((component) => component)}
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0,right:140, width: "100%" }}>
  <Text style={{ fontSize: 20, paddingBottom: 10, color: "#fff" }}>By ori and gal</Text>
</View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flexDirection: "column",
    
  },
  
  categories: {
    alignItems: "center",
  },
  header: {
    alignSelf:'center',
    color: "#fff",
    fontSize: 40,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
    shadowOffset: {
      height: 6,
      width: 6,
    },
    paddingBottom: 20,
  },
 
  modal: {
    padding: "10%",
  },
});

export default HomeScreen;
