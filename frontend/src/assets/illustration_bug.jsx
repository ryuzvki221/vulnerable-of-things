// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function BugIllustration({ ...other }) {
    const theme = useTheme();
    const PRIMARY_LIGHTER = theme.palette.primary.lighter;
    const PRIMARY_MAIN = theme.palette.primary.main;
    const PRIMARY_DARK = theme.palette.primary.dark;
    const PRIMARY_DARKER = theme.palette.primary.darker;

    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-130 -130 750 750">

                {/* rotate to 180  */}
                <g transform="rotate(180, 250, 250)">

                    <path d="M463.55,272.13H400v-48.2q0-4.32-.27-8.47c29.57-27.88,32.25-64.63,32.27-103,0-8.61-6.64-16-15.25-16.41A16,16,0,0,0,400,112c0,28-1.86,
            48.15-9.9,63.84-19.22-41.15-65.78-63.91-134.1-63.91-39.8,0-74.19,9.13-99.43,26.39-14.9,10.19-26.2,22.91-33.7,37.72C114,
            160.65,112,141,112,112.46c0-8.61-6.6-16-15.2-16.44A16,16,0,0,0,80,112c0,37.63,2.61,73.73,32.44,101.63q-.43,5.06-.44,10.3v48.2H48.45c-8.61,
            0-16,6.62-16.43,15.23a16,16,0,0,0,16,16.77h64V320a143.32,143.32,0,0,0,10.39,53.69C96.74,396.64,80.18,422,80,463.34c0,8.74,6.62,16.3,15.36,16.65A16,
            16,0,0,0,112,464c0-27.66,9.1-44.71,26.17-61.32A144.37,144.37,0,0,0,220,459.42a16,16,0,0,0,20-15.49V192.45c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,272,
            192V443.93a16,16,0,0,0,20,15.49,144.4,144.4,0,0,0,81.82-56.74c17,16.54,26.09,33.52,26.17,60.95A16.27,16.27,0,0,0,415.09,480,16,16,0,0,0,432,464c0-41.68-16.6-67.23-42.39-90.31A143.32,
            143.32,0,0,0,400,320V304.13h64a16,16,0,0,0,16-16.77C479.58,278.75,472.16,272.13,463.55,272.13Z"/>
                    <path d="M321.39,104l.32.09c13.57,3.8,25.07-10.55,18.2-22.85A95.86,95.86,0,0,0,256.21,32h-.42A95.87,95.87,0,0,0,171.6,82.13c-6.84,12.58,5.14,27,18.84,
            22.86,19.71-6,41.79-9.06,65.56-9.06C280.09,95.93,302.09,98.65,321.39,104Z"/>

                </g>
            </svg>
        </Box>
    );
}
