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
        { title: 'Nombre', field: 'name' },
        { title: 'Subtítulo', field: 'subTitle' },
        { title: 'Descripción', field: 'description' }
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
              API.post(`api/Menu/category`, newData)
                      .then(res => {
                        let clone = [];
                        Object.assign(clone, this.state.data);
                        clone.push(newData); 
                        this.setState({ data:clone });
                      }),
              onRowUpdate: (newData, oldData) => 
              API.put(`api/Menu/category`, newData)
              .then(res => {
                let clone = [];
                Object.assign(clone, this.state.data);
                console.log("clone1:", clone);
                const index = this.state.data.indexOf(oldData);
                clone[index] = newData;
                this.setState({ data:clone });
              }),
              onRowDelete: (oldData)=> 

              API.delete(`api/Menu/category/${oldData.categoryId}`)
              .then(res => {
                let clone = [];
                Object.assign(clone, this.state.data);
                console.log("clone1:", clone);
                const index = this.state.data.indexOf(oldData);
                clone.splice(index, 1);
                this.setState({ data:clone });
              })
            }}
            localization={Localization}
          />
      );
    }
  }


export default ListCategories;