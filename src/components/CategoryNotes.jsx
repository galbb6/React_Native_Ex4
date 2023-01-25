import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import { NotesContext } from "./Context";
const CategoryNotes = ({ categoryName, numberOfNotes, onPress }) => {
  const notesContext = useContext(NotesContext);
  
  const notesForCategory = notesContext.notes[categoryName];
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text} >{categoryName}</Text>
        <Text style={styles.text}>{(notesContext.notes[categoryName] == 0 || notesContext.notes[categoryName]== undefined)  ?0 :notesContext.notes[categoryName].length  }</Text>
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  container:{
    width: 300,
    padding: 10,
    justifyContent:'space-between',
    backgroundColor: "#4453",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    flexDirection:'row',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    alignSelf: "center",
    marginBottom:15,
  },
  text:{
    color: "#fff",
    width: "72%",
    padding: 20,
    fontSize: 24,
  }
});

export default CategoryNotes;
