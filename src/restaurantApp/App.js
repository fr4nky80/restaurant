import 'react-native-gesture-handler';
import React, {useState, useEffect}  from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {ProductScreen} from './pages/Products/products';
import API from './api/restaurant';
import {Header} from 'react-native';

const Drawer = createDrawerNavigator();
export default function App(){
  const [data, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await API.get('api/Menu/categories');
        setCategories(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {data.map((category) => (
          <Drawer.Screen
            name={category.name}
            component={ProductScreen}
            initialParams={{categoryId: category.categoryId}}
          />
        ))}
        <Drawer.Screen name="prueba" component={ProductScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
