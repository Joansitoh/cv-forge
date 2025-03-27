import { KeyboardArrowDownRounded, TranslateRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="mt-auto">
      <Button
        variant="contained"
        size="large"
        startIcon={<TranslateRounded />}
        endIcon={<KeyboardArrowDownRounded />}
        onClick={handleClick}
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        {t('sidebar.language')}: {currentLanguage.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        sx={{ textTransform: 'none' }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code} 
            onClick={() => changeLanguage(language.code)}
            selected={i18n.language === language.code}
            sx={{ width: '200px' }}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
