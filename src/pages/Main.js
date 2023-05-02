import React , {useState,  useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View , Text , TouchableOpacity, FlatList, StyleSheet} from "react-native"

import Constants from "expo-constants";

import Icon from 'react-native-vector-icons/MaterialIcons';



const Main = ({navigation}) =>{
const [books, setBooks] = useState([]);
  useEffect(() => {
      //AsyncStorage.removeItem("books");
      AsyncStorage.getItem("books").then(data => {
      const book = JSON.parse(data);
      setBooks(book);
   });
   

  },[]);



  const onNewBook = () => {
    navigation.navigate('Book');
  }

  const onBookEdit = (bookId) => {
       const book = books.find(item => item.id === bookId);
       navigation.navigate('Book', {book: book , isEdit: true});
  }

  const onBookDelete = async (bookId)=> {
      const newBooks = books.filter(item=> item.id !== bookId);
      await AsyncStorage.setItem("books", JSON.stringify(newBooks));
      setBooks(newBooks);
  }

  const onBookRead = async(bookId)=> {
    const newBooks = books.map(item=> {
      if(item.id === bookId) {
        item.read = !item.read; // false -> true / true -> false
      }
      return item;
    });

    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
      setBooks(newBooks); 
    }
  return (
    <View style={styles.container}>
      <View style={styles.toolbox}>
      <Text style={styles.title}>Lista de Leitura</Text>
      <TouchableOpacity 
      style={styles.toolboxButton}
      onPress={onNewBook}
      >
      <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      </View>
      <FlatList
       data={books}
       keyExtractor={item=> item.id}
       renderItem={({item})=> (
        <View style={styles.itemsContainer}>
        <TouchableOpacity 
              style={styles.itemButton}
              onPress={()=> onBookRead(item.id)}>
              <Text style={[styles.itemText, item.read ?
                 styles.itemRead : '']}>{item.title}</Text>
            </TouchableOpacity>
          <TouchableOpacity 
             style={styles.editButton}
              onPress={() => onBookEdit(item.id)} >
              <Icon name="create" size={25} color="#2ecc71"/>
          </TouchableOpacity>

          <TouchableOpacity 
             style={styles.deleteButton}
              onPress={()=> onBookDelete(item.id)} >
              <Icon name="delete" size={25} color="#e74c3c"/>
          </TouchableOpacity>


       
        </View>
        )}
       /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#f0ee87",
    paddingTop: Constants.statusBarHeight + 20,
    padding: 20
  },

  toolbox:{
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d7dd75"
  },

  title:{
    flex: 1,
    fontSize: 30,
    color: "#3498db",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase"
  },

  toolboxButton:{
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset:{
      width: 1,
      height: 1,
    },
    shadowRadius: 5
  },

  itemsContainer:{
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d7dd75",
    marginBottom: 5,
    paddingBottom: 5
  },

  itemButton:{
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  itemText:{
    fontSize: 26,
    color: "#2c3e50",
    textDecorationLine: "none",
    textTransform: "capitalize",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "left",
    flex: 1
  },

  itemRead:{
    textDecorationLine: "line-through",
    color: "#95a5a6"
  },

  editButton: {
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10
  },

  deleteButton: {
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    color: "#e74c3c"
  },

});
export default Main;