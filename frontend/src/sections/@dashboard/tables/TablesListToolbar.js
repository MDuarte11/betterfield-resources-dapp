import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Typography, OutlinedInput, Grid } from '@mui/material';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

TablesListToolbar.propTypes = {
  smartContractAddress: PropTypes.string,
  onSmartContractAddressChange: PropTypes.func,
  resourceId: PropTypes.string,
  onResourceIdChange: PropTypes.func,
  title: PropTypes.string,
  smartContractAddressPlaceholder: PropTypes.string,
  resourceIdPlaceholder: PropTypes.string
};

export default function TablesListToolbar({
  smartContractAddress,
  onSmartContractAddressChange,
  resourceId,
  onResourceIdChange,
  title,
  smartContractAddressPlaceholder,
  resourceIdPlaceholder
}) {
  return (
    <StyledRoot>
      <Grid container direction={'column'}>
        <Typography component="div" variant="subtitle1" marginTop={2}>
          {title}
        </Typography>
        <StyledSearch
          sx={{marginTop: 2, marginBottom: 2}}
          value={smartContractAddress}
          onChange={onSmartContractAddressChange}
          placeholder={smartContractAddressPlaceholder}
        />
        {onResourceIdChange && (
          <StyledSearch
            sx={{marginBottom: 2}}
            value={resourceId}
            onChange={onResourceIdChange}
            placeholder={resourceIdPlaceholder}
          />
        )}
      </Grid>
    </StyledRoot>
  );
}
