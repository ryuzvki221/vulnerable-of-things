import PropTypes from "prop-types";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "@/utils/format";
// components


const RootStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2, 2, 3),
}));

export default function GridSummary({
    icon,
    title,
    total
}) {
    const theme = useTheme();
    const totalItems = total !== undefined ? total : 0;

    return (
        <RootStyle>
            <div>
                <Typography variant="h3">{ fShortenNumber(totalItems)}</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {title}
                </Typography>
            </div>
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    lineHeight: 0,
                    borderRadius: '50%',
                    bgcolor: 'background.neutral',
                }}
            >
                {icon}
            </Box>
        </RootStyle>
    );

}


GridSummary.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
};