import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import API from '../Api/api'
class CategorySelect extends React.Component {
    state = {
        categories: [],
        selectedCategory: null
      }

  componentDidMount() {
    API.get(`api/Menu/categories`)
      .then(res => {
        const categories = res.data.data;
        this.setState({ categories });
      });
  }

  handleChange = (event) => {
    console.log("pasa");
    this.setState({selectedCategory: event.target.value });
    console.log(this.state.selectedCategory);
  };


  render() {

    return (
            <Select id="category" onChange={this.handleChange}>
            {this.state.categories.map((category, i) => {     
                // Return the element. Also pass key     
                return (<MenuItem value={category.categoryId}>{category.name}</MenuItem>) 
            })}

            </Select>
    )
  }
}

export default CategorySelect;
