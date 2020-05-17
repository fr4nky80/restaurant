import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ProductItem({item}) {
  return (
     <View>
       <View style={styles.item}>
         <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.price}>{item.price}</Text>
       </View>
       <Text style={styles.subtitle}>{item.description}</Text>
     </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: "#FFF"
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontFamily: 'Iowan Old Style',
    height: 44,
    width: 310,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    flexWrap: 'wrap',
    color: 'gray',
    margin: 10,
    fontSize: 15,
    fontFamily: 'Iowan Old Style',
  },
  price: {
    fontSize: 20,
    width: 70
  },
});
