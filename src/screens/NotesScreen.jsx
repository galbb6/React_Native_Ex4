import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext,useEffect } from "react";
import { Modal, Layout, Input, Card, Button } from "@ui-kitten/components";
import NoteInCategory from "./NoteInCategory";
import { NotesContext } from "../components/Context";
import { TextInput } from "@react-native-material/core";

import uuid from "react-native-uuid";
const NotesScreen = ({ route }) => {
  const { categoryName } = route.params;
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const notesContext = useContext(NotesContext);
  const [notesInCategory, setNotesInCategory] = useState([]) ;
  const [numberOfNotes, setNumberOfNotes] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState("");
 
  useEffect(() => {
    // your code here
    setNotesInCategory(notesContext.notes[categoryName])
}, [notesContext.notes,notesInCategory]);

  function addComponent() {
    setId(uuid.v4());
    if (!notesContext.notes[categoryName]) {
      notesContext.setNotes({
        ...notesContext.notes,
        [categoryName]: [
          <NoteInCategory
            text={categoryInputValue}
            categoryName={categoryName}
            id={id}
         
            onDelete={() => handleDelete(id,categoryName)}
          />,
        ],
      });
    } else {
      notesContext.setNotes({
        ...notesContext.notes,
        [categoryName]: [
          ...notesContext.notes[categoryName],
          <NoteInCategory
            text={categoryInputValue}
            categoryName={categoryName}
            id={id}
        
            onDelete={() => handleDelete(id,categoryName)}
          />,
        ],
      });
    }
    setNotesInCategory(notesContext.notes[categoryName])
    setNumberOfNotes(
      notesContext.notes[categoryName] == null ||
        notesContext.notes[categoryName] == undefined
        ? numberOfNotes
        : notesContext.notes[categoryName].length
    );
    
    
    setIsVisible(false);
    setCategoryInputValue("");
  }
  const handleDelete = (id,categoryName) => {
    console.log(notesInCategory)
    setNotesInCategory(prevNotes => prevNotes.filter(note => note.id !== id));
    notesContext.setNotes(prevNotes => {
        const updatedNotes = {...prevNotes};
        updatedNotes[categoryName] = updatedNotes[categoryName].filter(note => note.id !== id);
        return updatedNotes;
    });
      console.log('delete this ' + id + " on "+categoryName)
  }
  
  return (
    <Layout style={{ flex: 1, alignItems: "center", backgroundColor: "#223" }}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
            width: 300,
          }}
        >
          <Text style={styles.header}>{categoryName}</Text>

          <Button
            style={{
              borderRadius: 15,
              height: 45,
              width: 120,
              color: "#fff",
              backgroundColor: "#223",
              borderColor: "#fff",
              
            }}
            variant="outlined"
            onPress={() => {
              setIsVisible(true);
            }}
          >
            add note
          </Button>
        </View>
        <View>
          <Text style={{ color: "#fff", padding: 20, fontSize: 20 }}>
            Number of Notes :
            {notesContext.notes[categoryName] == 0 ||
            notesContext.notes[categoryName] == undefined
              ? numberOfNotes
              : notesContext.notes[categoryName].length}
          </Text>
        </View>
        <View style={{ position: "absolute", marginTop: 200 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#000000aa",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                disabled={true}
                style={{
                  backgroundColor: "#ffffff",
                  padding: 40,
                  margin: 50,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 10, padding:10 }}>
                  New Note
                </Text>
                <TextInput
                  placeholder="Add a context"
                  required
                  onChangeText={(text) => setCategoryInputValue(text)}
                  editable
                  multiline
                  maxLength={300}
                  numberOfLines={8}
                  style={{ width: 300 }}
                />
                <View style={{ flexDirection: "row", width: 200 }}>
                  <TouchableOpacity onPress={() => setIsVisible(false)}>
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
              </Card>
            </View>
          </Modal>
        </View  >
        {notesInCategory ? notesInCategory.map((note) => note) : ""}

      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#fff",
    fontSize: 40,
    shadowColor: "#000000",
    marginTop: 11,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 6,
      width: 6,
    },
    paddingBottom: 20,
  },
  note_container: {
    flex: 1,
  },
});

export default NotesScreen;
