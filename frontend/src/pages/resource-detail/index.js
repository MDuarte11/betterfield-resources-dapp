import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ResourceDetailPage() {
    const { t } = useTranslation()
    const { state } = useLocation()
    const theme = useTheme()

    const formatJson = (obj, indent = 0) => {
        const indentString = ' '.repeat(2); // Number of spaces for indentation
      
        const jsonString = JSON.stringify(obj, null, 2);
        const formattedString = jsonString
          .replace(/(\\?")/g, (match, p1) => (p1 === '\\"' ? '"' : p1)) // Replace escaped quotation marks with original quotation marks
          .replace(/(\{|\}|\[|\]|,)/g, (match, p1) => `${p1}\n${indentString.repeat(indent + 1)}`) // Add indentation after opening/closing braces, brackets, and commas
          .replace(/(".*?"):/g, (match, p1) => {
            const processedKey = p1.replace(/"/g, ''); // Add space after the colon for key-value pairs
            return `"${processedKey}": `;
          });
      
        return formattedString;
      };

  return (
    <>
      <Helmet>
        <title> {t('pages.resource-detail.tab-title')} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('pages.resource-detail.page-title')}
          </Typography>
        </Stack>

        <Stack mb={5} direction="column" alignItems="center" justifyContent="space-between">
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.id-detail-blockchain')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.resource.id}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.id-detail-native-system')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.resource.resource.id}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.name-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.resource.resource.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.type-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.resource.resource.type.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="row">
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.location-detail')}
                    </Typography>
                </Grid>
                <Grid item marginLeft={1} marginTop={0.5}>
                    <Typography variant="body2">
                        {state.resource.resource.location}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                alignItems="flex-start"
                direction="column"
                marginTop={5}>
                <Grid item>
                    <Typography variant="h6">
                        {t('pages.resource-detail.json-title')}
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
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {formatJson(state.json)}
                            </pre>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
      </Container>
    </>
  );
}