import {
    Box,
    Divider,
    Container,
    Typography,
} from "@mui/material";



// ----------------------------------------------------------------------

export default function Footer() {
    return (
        <Box
            sx={{
                py: 5,
                textAlign: "center",
                position: "relative",
                bgcolor: "background.default",
            }}
        >
            <Divider />
            <Container maxWidth="xl">
                <Typography
                    variant="caption"
                    component="p"
                    sx={{
                        mt: 5,
                        pb: 5,
                        fontSize: 12,
                        textAlign: { xs: "center", md: "left" },

                    }}
                >
                    © {new Date().getFullYear()} Vulnerable Of Things. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );

}