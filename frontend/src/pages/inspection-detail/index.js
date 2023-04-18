import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function InspectionDetailPage() {
    const { t } = useTranslation()
    const { state } = useLocation()
    const theme = useTheme()

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