import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from 'material-table';

const columns = [
  { id: 'name', label: 'Categoría', minWidth: 170 },
];

function createData(name) {
  return { name };
}

const rows = [
  createData('Carnes'),
  createData('Pescados'),
  createData('Entrantes'),
  createData('Postres'),
  createData('Vinos'),
  createData('Mariscos'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ListCategories() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <MaterialTable
        title="Remote Data Preview"
        columns={[
          { title: 'Id', field: 'categoryId' },
          { title: 'Categoría', field: 'name' }
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'https://localhost:5001/api/Menu/categories'
            fetch(url)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                resolve({
                  data: result,
                  page: 1,
                  totalCount: 1 // total row number
                })
              })
          })
        }
      />
  );
}
