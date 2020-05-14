import React from 'react';
import MaterialTable from 'material-table';
import Localization from '../localization/local.es'
import Typography from '@material-ui/core/Typography';
import API from '../Api/api';

class ListRestaurantConfig extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      columns:  [
        { title: 'Color primario', field: 'primaryColor' },
        { title: 'Restaurante', field: 'restaurantName' },
        { title: 'Url Logo', field: 'logo' },
        { title: 'Fuente', field: 'fontFamily' },
        { title: 'Por defecto', field: 'isDefault', type:'boolean' }
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
            title={<div> <Typography  variant="h6">Configuración</Typography> </div>}
            columns={this.state.columns}
            data={
              query =>  new Promise((resolve) => 
              {
                API.get(`api/Restaurant?PageSize=${query.pageSize}&PageNumber=${query.page+1}&searchPattern=${query.search}`)
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
              API.post(`api/Restaurant`, newData)
                      .then(res => {
                        let clone = [];
                        Object.assign(clone, this.state.data);
                        clone.push(newData); 
                        this.setState({ data:clone });
                      }),
              onRowUpdate: (newData, oldData) => 
              API.put(`api/Restaurant`, newData)
              .then(res => {
                let clone = [];
                Object.assign(clone, this.state.data);
                console.log("clone1:", clone);
                const index = this.state.data.indexOf(oldData);
                clone[index] = newData;
                this.setState({ data:clone });
              }),
              onRowDelete: (oldData)=> 

              API.delete(`api/Restaurant/${oldData.restaurantConfigId}`)
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
            // components={{
            //   EditRow: props => {{
            //     <CategoryCombo/>
            //   }}
            // }}
          />

</div>
      );
    }
  }


export default ListRestaurantConfig;