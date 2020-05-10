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

const columns = [
  { id: 'category', label: 'Categoría', minWidth: 170 },
  { id: 'name', label: 'Producto', minWidth: 170 },
  { id: 'price', label: 'PVP', minWidth: 170 },
  { id: 'description', label: 'Descripción', minWidth: 270 },
];

function createData(name, category, price, description) {
  return { name, category, price, description };
}

const rows = [
  createData('Solomillo', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
  createData('Lubina', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
  createData('Entrantes', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
  createData('Postres', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
  createData('Vinos', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
  createData('Mariscos', "Carnes", 32, "solomillo de angus calidad excelente para paladares exigentes."),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ListProducts() {
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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
