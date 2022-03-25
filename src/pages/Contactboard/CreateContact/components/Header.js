import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Platform} from 'react-native';
import {Header as CreateContactHeader, Left, Body, Right, Title } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'
import axios from 'axios';

export default function Header() {
  const [data, setData] = useState([])
  useEffect( () => {},[])
  getAllCalls();

  function getAllCalls(params) {
    axios.get('http://10.0.2.2:8000/api/calls')
    .then( response => { console.log(response.data); setData(response.data)})
    .catch(error => {console.log(error)} )
  }

  const Item = ({ body }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{body}</Text>
    </View>
  );
    return (
     
        // <CreateContactHeader>
        //   <Left/>
        //   <Body>
        //     <Title>Create Contact</Title>
        //   </Body>
        //   <Right>
        //     <Options/>
        //     </Right>
        // </CreateContactHeader>
        <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={data}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
