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

import { getInspections } from './actions'
import { selectInspections } from './selectors'
import i18 from '../../i18n'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: i18.t('pages.inspections.table.id'), alignRight: false },
  { id: 'name', label: i18.t('pages.inspections.table.name'), alignRight: false },
  { id: 'resource', label: i18.t('pages.inspections.table.resource'), alignRight: false },
  { id: 'conformity', label: i18.t('pages.inspections.table.conformity'), alignRight: false },
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

export default function InspectionsPage() {
  const navigate = useNavigate()
  const inspections = useSelector(selectInspections())
  const [tableInspections, setTableInspections] = useState([])
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


  const openInspectionDetail = (row) => {
    const json = inspections.inspectionsRaw.find((inspection) => {
      console.log(inspection)
      return JSON.parse(inspection).id === row.id // TODO: Request API to retrieve all data for the details page
    }
    )
    navigate(`/dashboard/inspection-detail/${row.id}`, {state:{inspection: row, json}})
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableInspections.length) : 0;

  const isNotFound = tableInspections && !tableInspections.length && !!filterName;

  useEffect(() => {
    dispatch(getInspections({
      smartContractAddress: "0x11B2BAB03c992fEB788fd687ef304dB3c8667bC7", // TODO: Use hardcoded smart contract address for now
      resourceId: "2",
      lastId: "",
      pageSize: "10",
    }));
  }, [dispatch]);

  useEffect(() => {
    if (inspections) {
      setTableInspections(applySortFilter(inspections.inspections, getComparator(order, orderBy), filterName))
    }
    ;
    
  }, [inspections, order, orderBy, filterName]);

  return (
    <>
      <Helmet>
        <title> {t('pages.inspections.tab-title')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('pages.inspections.page-title')}
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
                  rowCount={tableInspections && tableInspections.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {tableInspections && tableInspections.map((row) => {
                    const { id, name, resource, conformity } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} onClick={() => openInspectionDetail(row)}>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{resource.name}</TableCell>
                        <TableCell align="left">{conformity}</TableCell>
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
            count={tableInspections && tableInspections.length}
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
