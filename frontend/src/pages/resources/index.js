import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Scrollbar from '../../components/scrollbar';
// sections
import { ResourcesListHead /* , ResourcesListToolbar */ } from '../../sections/@dashboard/resources';

import { getResources } from './actions'
import { selectResources } from './selectors'
import i18 from '../../i18n'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: i18.t('pages.resources.table.id'), alignRight: false },
  { id: 'name', label: i18.t('pages.resources.table.name'), alignRight: false },
  { id: 'type', label: i18.t('pages.resources.table.type'), alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_resource) => _resource.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ResourcesPage() {
  const navigate = useNavigate()
  const resources = useSelector(selectResources())
  const [tableResources, setTableResources] = useState([])
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName /* , setFilterName */ ] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  }; 

  const handleCloseMenu = () => {
    setOpen(null);
  }; */

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const openResourceDetail = (row) => {
    navigate(`/dashboard/resource-detail/${row.id}`)
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  /* 
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }; */

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableResources.length) : 0;

  const isNotFound = tableResources && !tableResources.length && !!filterName;

  useEffect(() => {
    dispatch(getResources({
      smartContractAddress: "0xB64B944d31Fe7B6Fd9464a4EaB25a409BC9d1b22", // TODO: Use hardcoded smart contract address for now
      lastId: "",
      pageSize: "10",
    }));
  }, [dispatch]);

  useEffect(() => {
    if (resources) {
      setTableResources(applySortFilter(resources.resources, getComparator(order, orderBy), filterName))
    }
    ;
    
  }, [resources, order, orderBy, filterName]);

  return (
    <>
      <Helmet>
        <title> {t('pages.resources.tab-title')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('pages.resources.page-title')}
          </Typography>
        </Stack>

        <Card>
          { /* <ResourcesListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */ }

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ResourcesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableResources && tableResources.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {tableResources && tableResources.map((row) => {
                    const { id, name, type } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} onClick={() => openResourceDetail(row)}>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{type.name}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableResources && tableResources.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
