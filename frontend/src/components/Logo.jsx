import { forwardRef } from "react";
import NextLink from "next/link";
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";




const TextLogoStyled = styled(Typography)(({ theme }) => ({

  display: "flex",
  color: theme.palette.primary.darker,
  fontWeight: "bold",
  fontSize: 24,
  [theme.breakpoints.down("md")]: {
    fontSize: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));

const Logo = forwardRef(({ disabledLink = false, isMini, sx }, ref) => {

  const width = isMini ? 40 : 692/4;
  const height = isMini ? 40 : 196/4;

  if (disabledLink) {
    return (
      <>
      <Box ref={ref} sx={{ width: {width}, height: {height}, cursor: 'pointer', ...sx }}>
        <TextLogoStyled >V<span style={{color: '#FFC107'}}>o</span>T</TextLogoStyled>
      </Box>
      </>
    );
  }

  return (
    <NextLink href="/">
      <>
      <Box ref={ref} sx={{ width: {width}, height: {height}, cursor: 'pointer', ...sx }}>
        <TextLogoStyled >V<span style={{color: '#FFC107'}}>o</span>T</TextLogoStyled>
      </Box>
      </>
    </NextLink>
  );
});

Logo.displayName = "Vunerable Of Things";

export default Logo;
