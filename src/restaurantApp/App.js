import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import API from './api/restaurant';

function ProductScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

// let routeConfig = {};

// categories.map(category => {
//     routeConfig[category.key] = {
//         screen: CategoryScreen, // your template screen, common to every item
//         navigationOptions: (props) => {
//             props.navigation.setParams({ category });
//         }
//     }
// });

const Drawer = createDrawerNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categorySelected: null,
    };
  }

  async componentDidMount() {
    try {
      const res = await API.get('api/Menu/categories');
      this.setState({categories: res.data.data});
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          {this.state.categories.map((category) => (
            <Drawer.Screen
              name={category.name}
              component={ProductScreen}
              options={{categoryId: category.categoryId}}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
