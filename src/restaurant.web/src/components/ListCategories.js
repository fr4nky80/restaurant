import React from 'react';
import MaterialTable from 'material-table';
import Localization from '../localization/local.es'
import Typography from '@material-ui/core/Typography';
import API from '../Api/api';

class ListCategories extends React.Component {
  _isMounted = false;
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
    render() {
      return (
        <MaterialTable
            title={<div> <Typography  variant="h6">Categorías</Typography> </div>}
            columns={this.state.columns}
            data={
              query =>  new Promise((resolve) => 
              {
                API.get(`api/Menu/categories?PageSize=${query.pageSize}&PageNumber=${query.page+1}&searchPattern=${query.search}`)
                .then(res => {
                    resolve({
                      data:  res.data.data,
                      page: res.data.currentPage-1,
                      totalCount: res.data.totalCount
                    });  
                    this.setState({ 
                      data: res.data.data,
                      page: res.data.currentPage,
                      totalCount: res.data.totalCount
                    }, () => resolve())
                    
                  })
                  
              })
            }
            editable={{
              onRowAdd: newData => 
                new Promise(resolve => {
                  setTimeout(() => {
                    {
                      const data = this.state.data;
                      data.push(newData);
                      // this.setState({ data, page, totalCount }, () => resolve());
                      console.log(this.state.data);
                    }
                    resolve()
                  API.post(`api/Menu/category`, newData)
                      .then(res => console.log(res.data));
              }, 600);
              this.tableRef.current && this.tableRef.current.onQueryChange()
              }),
              onRowUpdate: (newData, oldData) => 
                new Promise(resolve => {
                  setTimeout(() => {
               {
                    const data = this.state.data;
                    const index = oldData.tableData.id;
                    data[index] = newData;
                     this.setState({ data }, () => resolve());
                    console.log(this.state.data);
                    console.log(newData);
               }
               resolve()
                  API.put(`api/Menu/category`, newData)
                      .then(res => console.log(res.data));
              }, 600);
              this.tableRef.current && this.tableRef.current.onQueryChange()
            }),
              onRowDelete: (oldData)=> 
                new Promise(resolve => {
                  setTimeout(() => {
                    {
                      let data = this.state.data;
                      const index = oldData.tableData.id;
                      data.splice(index, 1);
                      console.log(this.state.data);
                    }
                    resolve()
                  API.delete(`api/Menu/category/${oldData.categoryId}`)
                      .then(res => console.log(res.data));
              }, 600);
              })
            }}
            localization={Localization}
          />
      );
    }
  }


export default ListCategories;