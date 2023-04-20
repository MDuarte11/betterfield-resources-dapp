import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { 
    Grid,
    Container,
    Stack,
    Typography,
    Box,
    Card,
    Table,
    Paper,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Button
} from '@mui/material';
import { filter } from 'lodash';
// components
import Scrollbar from '../../components/scrollbar';
// sections
import { TablesListHead } from '../../sections/@dashboard/tables';
import i18 from '../../i18n'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: i18.t('pages.inspection-detail.items-table.id'), alignRight: false },
    { id: 'name', label: i18.t('pages.inspection-detail.items-table.name'), alignRight: false },
    { id: 'conformity', label: i18.t('pages.inspection-detail.items-table.conformity'), alignRight: false },
    { id: 'media', label: i18.t('pages.inspection-detail.items-table.media'), alignRight: false },
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

export default function InspectionDetailPage() {
    const { t } = useTranslation()
    const { state } = useLocation()
    const theme = useTheme()

    const inspectionItems = state.inspection.items
    const [tableInspectionItems, setTableInspectionItems] = useState([])

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('');

    const [filterName /* , setFilterName */ ] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    /*
    const openInspectionDetail = (row) => {
        const json = inspections.inspectionsRaw.find((inspection) => {
          console.log(inspection)
          return JSON.parse(inspection).id === row.id // TODO: Request API to retrieve all data for the details page
        }
        )
        navigate(`/dashboard/inspection-detail/${row.id}`, {state:{inspection: row, json}})
    }; */
    
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableInspectionItems.length) : 0;

    const isNotFound = tableInspectionItems && !tableInspectionItems.length && !!filterName;  

    useEffect(() => {
        if (inspectionItems) {
            setTableInspectionItems(applySortFilter(inspectionItems, getComparator(order, orderBy), filterName))
        }
    }, [inspectionItems, order, orderBy, filterName]);
  return (
    <>
      <Helmet>
        <title> {t('pages.inspection-detail.tab-title')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('pages.inspection-detail.page-title')}
          </Typography>
        </Stack>

        <Stack mb={5} direction="column" alignItems="center" justifyContent="space-between">
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.id-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.inspection.id}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.name-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.inspection.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.resource-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.inspection.resource.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.conformity-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.inspection.conformity}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="column"
                marginTop={5}
                >
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.items-detail')}
                    </Typography>
                </Grid>
                <Grid item 
                    marginTop={3}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Card>
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TablesListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={tableInspectionItems && tableInspectionItems.length}
                                // numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                {tableInspectionItems && tableInspectionItems.map((row) => {
                                    const { id, name, conformity, mediaURLs } = row;
                                    return (
                                    <TableRow hover key={id} tabIndex={-1}>
                                        <TableCell align="left">{id}</TableCell>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{conformity}</TableCell>
                                        <TableCell align="left" sx={{paddingLeft: 0 }} >
                                            {
                                                <Button disabled={!mediaURLs} /* onClick={() => openInspectionDetail(row)} */ >
                                                    {t('pages.inspection-detail.items-table.see-button')}
                                                </Button>
                                            }
                                        </TableCell>
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
                            count={tableInspectionItems && tableInspectionItems.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="column"
                marginTop={5}>
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.inspection-detail.json-title')}
                    </Typography>
                </Grid>
                <Grid item marginTop={3}>
                    <Box sx={{
                        width: '100%',
                        padding: 2,
                        borderRadius: 1,
                        border: 1,
                        borderColor: theme.palette.grey[500]
                    }}>
                        <Typography variant="body2">
                            {state.json}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
      </Container>
    </>
  );
}