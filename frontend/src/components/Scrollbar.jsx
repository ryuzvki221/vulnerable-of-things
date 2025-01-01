import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { useState, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  // Utilisation d'un état local pour déterminer si le composant est rendu côté serveur ou côté client
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Une fois que le composant est monté côté client, mettre à jour l'état pour indiquer que l'hydratation a eu lieu
    setIsHydrated(true);
  }, []);

  return (
    <RootStyle>
      {/* Utiliser un conteneur simple si le composant est rendu côté serveur ou si l'hydratation n'est pas encore complète */}
      {(typeof window === 'undefined' || !isHydrated) ? (
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      ) : (
        <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
          {children}
        </SimpleBarStyle>
      )}
    </RootStyle>
  );
}
