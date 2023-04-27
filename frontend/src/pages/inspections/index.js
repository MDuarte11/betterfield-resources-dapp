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
import { TablesListHead , TablesListToolbar } from '../../sections/@dashboard/tables';
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

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function InspectionsPage() {
  const navigate = useNavigate()
  const inspections = useSelector(selectInspections())
  const [tableInspections, setTableInspections] = useState([])
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [page, setPage] = useState(0);

  const [inspectionsCount, setInspectionsCount] = useState(0);

  const [lastInspectionIdsMap, setLastInspectionIdsMap] = useState({0: ''});

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [smartContractAddress, setSmartContractAddress] = useState(localStorage.getItem("smartContractAddress"));

  const [resourceId, setResourceId] = useState(localStorage.getItem("resourceId"));

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

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLastInspectionIdsMap({0: ''})
    setRowsPerPage(parseInt(event.target.value, 10));
  };
 
  const handleSmartContractAddressChange = (event) => {
    setPage(0);
    setSmartContractAddress(event.target.value)
    localStorage.setItem("smartContractAddress", event.target.value)
  };

  const handleResourceIdChange = (event) => {
    setPage(0);
    setResourceId(event.target.value)
    localStorage.setItem("resourceId", event.target.value)
  };

  const isNotFound = tableInspections && tableInspections.length === 0;

  // eslint-disable-next-line
  const searchInspections = useCallback(debounce((smartContractAddress, resourceId, rowsPerPage, lastResourceIdsMap, page) => {
    dispatch(getInspections({
      smartContractAddress,
      resourceId,
      lastId: lastResourceIdsMap[page],
      pageSize: `${rowsPerPage}`,
    }));
  }, 500), [])

  useEffect(() => {
    searchInspections(smartContractAddress, resourceId, rowsPerPage, lastInspectionIdsMap, page)
  }, [dispatch, smartContractAddress, searchInspections, resourceId, rowsPerPage, lastInspectionIdsMap, page]);

  useEffect(() => {
    if (inspections && inspections.inspections && inspections.inspections.length > 0) {
      setTableInspections(applySortFilter(inspections.inspections, getComparator(order, orderBy)))
      if(inspections.inspectionsCount) {
        setInspectionsCount(inspections.inspectionsCount)
      }

      const newMap = lastInspectionIdsMap
      newMap[page + 1] = inspections.lastInspectionId 
      setLastInspectionIdsMap(newMap)
    } else {
      setTableInspections([])
    }
  }, [inspections, order, orderBy, lastInspectionIdsMap, page]);

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
          <TablesListToolbar
            smartContractAddress={smartContractAddress}
            onSmartContractAddressChange={handleSmartContractAddressChange}
            resourceId={resourceId}
            onResourceIdChange={handleResourceIdChange}
            title={t('pages.inspections.header.title')}
            smartContractAddressPlaceholder={t('pages.inspections.header.smartcontract-placeholder')}
            resourceIdPlaceholder={t('pages.inspections.header.resourceid-placeholder')}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TablesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableInspections && tableInspections.length}
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
                        <TableCell align="left">{t(conformity)}</TableCell>
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
                            {t('pages.inspections.table.no-results-title')}
                          </Typography>

                          <Typography variant="body2">
                            {t('pages.inspections.table.no-results-message')}
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
            count={inspectionsCount}
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
