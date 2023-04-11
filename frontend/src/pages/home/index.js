import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title> {t('pages.home.tab-title')} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t('pages.home.page-title')}
        </Typography>

        <Typography variant="body1" sx={{ mb: 5, whiteSpace: 'pre-line' }}>
          {t('pages.home.welcome-message')}
        </Typography>
      </Container>
    </>
  );
}
