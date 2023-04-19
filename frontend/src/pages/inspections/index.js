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
import { ResourcesListHead , ResourcesListToolbar } from '../../sections/@dashboard/resources';
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

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [smartContractAddress, setSmartContractAddress] = useState('');

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
 
  const handleSmartContractAddressChange = (event) => {
    setPage(0);
    setSmartContractAddress(event.target.value)
  };

  const isNotFound = tableInspections && tableInspections.length === 0;

  // eslint-disable-next-line
  const searchInspections = useCallback(debounce((smartContractAddress) => {
    dispatch(getInspections({
      smartContractAddress,
      resourceId: "2",
      lastId: "",
      pageSize: "10",
    }));
  }, 500), [])

  useEffect(() => {
    searchInspections(smartContractAddress)
  }, [dispatch, smartContractAddress, searchInspections]);

  useEffect(() => {
    if (inspections && inspections.inspections && inspections.inspections.length > 0) {
      setTableInspections(applySortFilter(inspections.inspections, getComparator(order, orderBy)))
    } else {
      setTableInspections([])
    }
  }, [inspections, order, orderBy]);

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
          {
          <ResourcesListToolbar
            smartContractAddress={smartContractAddress}
            onSmartContractAddressChange={handleSmartContractAddressChange}
            title={t('pages.inspections.header.title')}
            placeholder={t('pages.inspections.header.placeholder')}
          /> }
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ResourcesListHead
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
                        <TableCell align="left">{conformity}</TableCell>
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
