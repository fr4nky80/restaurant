import {FlatList, StyleSheet, View, Text} from 'react-native';

export const ProductItem(props) {
    
    return (
        <Text style={styles.item}>{props.item.title}</Text>
    )
}

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 20,
      fontFamily: 'Iowan Old Style',
      height: 44,
      textTransform: 'uppercase',
      fontWeight: "bold"
    },
  });