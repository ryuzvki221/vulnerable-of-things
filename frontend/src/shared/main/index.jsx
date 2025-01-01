// @mui
import { Stack, Box } from "@mui/material";
import Header from "./header";
import Footer from "./footer";


export default function MainLayout({ children }) {
    return (
        <Stack sx={{ minHeight: 1 }}>
            <Header />
            {children}
            <Box sx={{ flexGrow: 1 }} />
            <Footer />
        </Stack>
    );
}