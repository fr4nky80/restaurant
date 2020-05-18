import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {ProductScreen} from './pages/Products/products';
import API from './api/restaurant';

const Drawer = createDrawerNavigator();
export default function App() {
  const [data, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setLoaded(false);
      try {
        const result = await API.get('api/Menu/categories');
        setCategories(result.data.data);
        console.log(result.data.data);
        setLoaded(true);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {isLoaded && (
        <Drawer.Navigator>
          {data.map((category) => (
            <Drawer.Screen
              name={category.name}
              component={ProductScreen}
              initialParams={{categoryId: category.categoryId}}
            />
          ))}
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
