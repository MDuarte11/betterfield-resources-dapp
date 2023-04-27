import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { debounce } from 'lodash';
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
import { TablesListHead, TablesListToolbar } from '../../sections/@dashboard/tables';

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

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ResourcesPage() {
  const navigate = useNavigate()
  const resources = useSelector(selectResources())
  const [tableResources, setTableResources] = useState([])
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [page, setPage] = useState(0);

  const [resourcesCount, setResourcesCount] = useState(0);

  const [lastResourceIdsMap, setLastResourceIdsMap] = useState({0: ''});

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [smartContractAddress, setSmartContractAddress] = useState(localStorage.getItem("resourcesSmartContractAddress"));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const openResourceDetail = (row) => {
    const json = resources.resourcesRaw.find((resource) =>
      JSON.parse(resource).id === row.id // TODO: Request API to retrieve all data for the details page
    )
    navigate(`/dashboard/resource-detail/${row.id}`, {state:{resource: row, json}})
  };

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLastResourceIdsMap({0: ''})
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSmartContractAddressChange = (event) => {
    setPage(0);
    setSmartContractAddress(event.target.value)
    localStorage.setItem("resourcesSmartContractAddress", event.target.value)
  };

  const isNotFound = tableResources && !tableResources.length;

  // eslint-disable-next-line
  const searchResources = useCallback(debounce((smartContractAddress, rowsPerPage, lastResourceIdsMap, page) => {
    dispatch(getResources({
      smartContractAddress,
      lastId: lastResourceIdsMap[page],
      pageSize: `${rowsPerPage}`,
    }));
    }, 500), [])
  
    useEffect(() => {
      searchResources(smartContractAddress, rowsPerPage, lastResourceIdsMap, page)
    }, [dispatch, smartContractAddress, searchResources, rowsPerPage, page, lastResourceIdsMap]);

  useEffect(() => {
    if (resources && resources.resources && resources.resources.length > 0) {
      setTableResources(applySortFilter(resources.resources, getComparator(order, orderBy)))

      if(resources.resourcesCount) {
        setResourcesCount(resources.resourcesCount)
      }

      const newMap = lastResourceIdsMap
      newMap[page + 1] = resources.lastResourceId 
      setLastResourceIdsMap(newMap)
    }
    
  }, [resources, order, orderBy, lastResourceIdsMap, page]);

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
        <TablesListToolbar
            smartContractAddress={smartContractAddress}
            onSmartContractAddressChange={handleSmartContractAddressChange}
            title={t('pages.resources.header.title')}
            smartContractAddressPlaceholder={t('pages.resources.header.placeholder')}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TablesListHead
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
                            {t('pages.resources.table.no-results-title')}
                          </Typography>

                          <Typography variant="body2">
                            {t('pages.resources.table.no-results-message')}
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
            count={resourcesCount}
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
