import React, { Component } from 'react';
import './App.css';
// import SimpleBottomNavigation from './components/Menu'
// import SimpleTabs from './components/Tabs'
import ListCategories from './components/ListCategories'

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <ListCategories />
          {/* <br /> */}
          {/* <SimpleBottomNavigation /> */}
      </div>
     
    );
  }
}

export default App;
