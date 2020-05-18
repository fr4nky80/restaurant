import React, {useState, useEffect} from 'react';
import API from '../../api/restaurant';
import {FlatList, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from './item';

function LogoTitle() {
  const navigation = useNavigation();
  const onPress = () => navigation.toggleDrawer();
  return (
    <>
    <View style={styles.containerHeader}>
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
      <Image source={{
        uri:
          'https://media-cdn.tripadvisor.com/media/photo-p/18/11/41/73/logo-nuevo-2019.jpg',
      }}
      style={{width: 40, height: 40}}/>
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
    <Image
      source={{
        uri:
          'https://media-cdn.tripadvisor.com/media/photo-p/18/11/41/73/logo-nuevo-2019.jpg',
      }}
      style={{width: 220, height: 130}}
    />
    </View>
    </>
  );
}

export const ProductScreen = () => {
  const [data, setProducts] = useState([]);
  const route = useRoute();
  const [isError, setIsError] = useState(false);
  const [categoryId, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setCategory(route.params.categoryId);
      console.log(categoryId);
      setIsError(false);
      try {
        const url = `/api/Menu/category/${categoryId}/details`;
        const result = await API.get(url);
        setProducts(result.data.products.data);
        console.log(result.data.products.data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <View style={styles.containerHeader}>
        <LogoTitle />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <ProductItem item={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  containerHeader: {
    textAlign: 'left',
  },
  item: {
    padding: 10,
    fontSize: 20,
    fontFamily: 'Iowan Old Style',
    height: 44,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
