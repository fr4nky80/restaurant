import React from 'react';
import MaterialTable from 'material-table';
import Localization from '../localization/local.es'
import Typography from '@material-ui/core/Typography';
import CategoryCombo from '../components/category-combo';
import API from '../Api/api';

class ListProducts extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      columns:  [
        { title: 'Titulo', field: 'title' },
        { title: 'Descripción', field: 'description' },
        { title: 'PVP', field: 'price', type: 'currency', currencySetting:{locale:'es-ES',currencyCode:'EUR',minimumFractionDigits:2,maximumFractionDigits:2} },
        { title: 'Categoría', field: 'category',
          editComponent: x => (
            <CategoryCombo />
          )
        }
      ], 
      data: [],
      page: 1,
      totalCount: 1
    } 
  }
    render() {
      return (
        <div>
        <MaterialTable
            title={<div> <Typography  variant="h6">Productos</Typography> </div>}
            columns={this.state.columns}
            data={
              query =>  new Promise((resolve) => 
              {
                API.get(`api/Menu/products?PageSize=${query.pageSize}&PageNumber=${query.page+1}&searchPattern=${query.search}`)
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
              API.post(`api/Menu/product`, newData)
                      .then(res => {
                        let clone = [];
                        Object.assign(clone, this.state.data);
                        clone.push(newData); 
                        this.setState({ data:clone });
                      }),
              onRowUpdate: (newData, oldData) => 
              API.put(`api/Menu/product`, newData)
              .then(res => {
                let clone = [];
                Object.assign(clone, this.state.data);
                console.log("clone1:", clone);
                const index = this.state.data.indexOf(oldData);
                clone[index] = newData;
                this.setState({ data:clone });
              }),
              onRowDelete: (oldData)=> 

              API.delete(`api/Menu/product/${oldData.productId}`)
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

</div>
      );
    }
  }


export default ListProducts;