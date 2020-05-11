import React from 'react';
import MaterialTable from 'material-table';
import Localization from '../localization/local.es'

class ListCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns:  [
        { title: 'Nombre', field: 'name' }
      ], 
      data: [],
      page: 1,
      totalCount: 1
    } 
  }

  componentWillMount() {
    fetch('https://localhost:5001/api/Menu/categories')
      .then((response) => {
        this.setState({page: response.headers["page"]});
        this.setState({totalCount: response.headers["totalCount"]});
        return response.json()
      })
      .then((categories) => {
        this.setState({ 
          data: categories,
          page: this.state.page,
          totalCount: this.state.totalCount
         })
      })
  }

    render() {
      return (
        <MaterialTable
            title="Categorías"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: newData => {
                new Promise((resolve, reject) => {
                  let url = 'https://localhost:5001/api/Menu/category'
                  fetch (url, {
                    method: 'POST',
                    body: JSON.stringify(newData),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => {
                     
                      return response.json()
                    })
                    .then(result => {
                      const data = this.state.data;
                      data.push(newData);

                      this.setState({ data: data }, () => resolve())
                    })
    
                })
              },
              onRowUpdate: (newData, oldData) => {
                new Promise((resolve, reject) => {
                  let url = 'https://localhost:5001/api/Menu/category'
                  fetch (url, {
                    method: 'PUT',
                    body: JSON.stringify(newData),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => response.json())
                    .then(result => {
                      const data = this.state.data;
                      const index = data.indexOf(oldData);
                      data[index] = newData; 
                      this.setState({ data: data }, () => resolve())
                    })
    
                })
              },
              onRowDelete: (oldData)=>{
                new Promise((resolve, reject) => {
                  let url = 'https://localhost:5001/api/Menu/category/'+oldData.categoryId
                  fetch (url, {
                    method: 'DELETE'
                  })
                    .then(response => response.json())
                    .then(result => {
                      let data = this.state.data;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data: data }, () => resolve())
                    })
                })
              }
            }}
            localization={Localization}
          />
      );
    }
  }


export default ListCategories;