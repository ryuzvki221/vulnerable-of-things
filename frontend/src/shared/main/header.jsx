import { useRouter } from 'next/router';
import { styled, useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container } from '@mui/material';
import useOffSet from '@/hooks/useOffSetTop';
import cssStyles from '@/utils/cssStyles';
import { HEADER } from '@/utils/config';
import LINKS from './links';
import MenuDesktop from './menu';
import Logo from '@/components/Logo';

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

export default function Header() {
  const theme = useTheme();
  const { push, pathname } = useRouter();
  const isOffset = useOffSet(HEADER.MAIN_DESKTOP_HEIGHT);
  const isHome = pathname === '/';

  return (
    <AppBar component="nav" sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          maxWidth="xl"
        >
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <MenuDesktop isOffset={isOffset} isHome={isHome} config={LINKS} />
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
