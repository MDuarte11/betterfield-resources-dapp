import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import i18next from '../../../i18n'

export default function LanguagePopover() {
  const LANGS = [
    {
      value: 'pt',
      label: i18next.t('languages.portuguese'),
      icon: '/assets/icons/ic_flag_pt.svg',
    },
    {
      value: 'fr',
      label: i18next.t('languages.french'),
      icon: '/assets/icons/ic_flag_fr.svg',
    },
    {
      value: 'en',
      label: i18next.t('languages.english'),
      icon: '/assets/icons/ic_flag_en.svg',
    }
  ];

  // ----------------------------------------------------------------------

  const [open, setOpen] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGS.find(element => element.value === i18next.language) ?? LANGS[0]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (language) => {
    setOpen(null);
    i18next.changeLanguage(language)
    const selectedLanguage = LANGS.find(element => element.value === language)
    setSelectedLanguage(selectedLanguage)
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={selectedLanguage.icon} alt={selectedLanguage.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === selectedLanguage.value} onClick={() => handleClose(option.value)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
