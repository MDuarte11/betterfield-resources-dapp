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
import { Web3Storage } from 'web3.storage'
// components
import MediaGallery from '../../components/media-gallery';
import Scrollbar from '../../components/scrollbar';
// sections
import { TablesListHead } from '../../sections/@dashboard/tables';

const web3Token = process.env.REACT_APP_WEB3_STORAGE_TOKEN
const web3StorageClient = new Web3Storage({ token: web3Token });

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

    const [mediaFiles, setMediaFiles] = useState([])

    const [openMedia, setOpenMedia] = useState(false)

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('');

    const [filterName /* , setFilterName */ ] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    // ----------------------------------------------------------------------

    const TABLE_HEAD = [
        { id: 'id', label: t('pages.inspection-detail.items-table.id'), alignRight: false },
        { id: 'name', label: t('pages.inspection-detail.items-table.name'), alignRight: false },
        { id: 'conformity', label: t('pages.inspection-detail.items-table.conformity'), alignRight: false },
        { id: 'media', label: t('pages.inspection-detail.items-table.media'), alignRight: false },
      ];

    // ----------------------------------------------------------------------

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const readFile = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onloadend = () => {
            resolve(reader.result);
          };
          
          reader.onerror = () => {
            reject(reader.error);
          };
          
          reader.readAsArrayBuffer(file);
        });
    
    const openMediaGallery = async (row) => {
        if(row.mediaCID) {
            setMediaFiles([])
            setOpenMedia(true)
            const response = await web3StorageClient.get(row.mediaCID)
            const files = await response.files()
            const blobs = await Promise.all(files.map(async (file) => {
                try {
                    const buffer = await readFile(file);
                    
                    // Define magic number byte sequences and their corresponding MIME types
                    const magicNumbers = [
                    { sequence: [0xFF, 0xD8, 0xFF], mimeType: 'image/jpeg' },
                    { sequence: [0x89, 0x50, 0x4E, 0x47], mimeType: 'image/png' },
                    { sequence: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], mimeType: 'image/gif' },
                    { sequence: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], mimeType: 'image/gif' },
                    { sequence: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32], mimeType: 'video/mp4' },
                    { sequence: [0x1A, 0x45, 0xDF, 0xA3], mimeType: 'video/webm' },
                    { sequence: [0x49, 0x44, 0x33], mimeType: 'audio/mpeg' },
                    { sequence: [0x52, 0x49, 0x46, 0x46], mimeType: 'audio/wav' }
                    // Add more magic number and MIME type pairs as needed
                    ];
                    
                    // Convert the buffer to Uint8Array
                    const uint8Array = new Uint8Array(buffer);
                    
                    // Check the buffer against the magic number byte sequences
                    const mimeType = magicNumbers.find((magicNumber) =>
                    magicNumber.sequence.every((byte, index) => byte === uint8Array[index])
                    )?.mimeType;
                    
                    if (mimeType) {
                        return new Blob([buffer], { type: mimeType })
                    }
                    
                    return new Blob([buffer], { type: "image/jpeg" })
                } catch (error) {
                    return file
                }
            }))
            
            setMediaFiles(blobs)
        }
        
    };
    
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleCloseMedia = () => {
        setOpenMedia(false)
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
      <MediaGallery files={mediaFiles} open={openMedia} onClose={handleCloseMedia}/>
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
                                    const { id, name, conformity, mediaCID } = row;
                                    return (
                                    <TableRow hover key={id} tabIndex={-1}>
                                        <TableCell align="left">{id}</TableCell>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{conformity}</TableCell>
                                        <TableCell align="left" sx={{paddingLeft: 0 }} >
                                            {
                                                <Button disabled={!mediaCID}  onClick={() => openMediaGallery(row)} >
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