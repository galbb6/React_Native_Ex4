import { StyleSheet ,TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {Card, Text} from "@ui-kitten/components";
import uuid from 'react-native-uuid'
import Icon from "react-native-vector-icons/Ionicons";
import { Size } from '@ui-kitten/components/devsupport';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';


const NoteInCategory = ({text,onDelete ,id,categoryName}) => {
  console.log(id + '  firs get id')

console.log(typeof onDelete)




  return (
<Card style={styles.container} key={id+'card'}>
        <Text style={styles.text}>
            {text}
        </Text>
        <Icon name='trash-outline' style={styles.deleteIcon} key={id + 'icon'} onPress={() => onDelete(id,categoryName)} />
    </Card>
  )
}

const styles = StyleSheet.create({
  container:{
    width: 300,
    backgroundColor: "#4453",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
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
    padding: 20,
    fontSize: 16,
    alignSelf:'flex-start'
  },
  deleteIcon: {
    position: "absolute",
    right:10 ,
    top: 10,
    padding: 10,
    width: 100,
    fontSize: 40,
    height: 150
  }
})

export default NoteInCategory