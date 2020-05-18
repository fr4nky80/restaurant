import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ProductItem({item}) {
  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
      <Text style={styles.subtitle}>{item.description}</Text>
      <Text style={styles.allergens}>{item.allergens}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#CCC',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontFamily: 'Merriweather-BlackItalic',
    height: 44,
    width: 310,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    flexWrap: 'wrap',
    color: 'gray',
    paddingTop: 5,
    paddingLeft:10,
    fontSize: 15,
    fontFamily: 'Merriweather-Light',
  },
  allergens: {
    flexWrap: 'wrap',
    color: '#d89ded',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontFamily: 'Merriweather-Light',
    fontStyle: 'italic'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 70,
    textAlignVertical: 'center',
    textAlign: 'right',
    fontFamily: 'Merriweather-BlackItalic',
  },
});
