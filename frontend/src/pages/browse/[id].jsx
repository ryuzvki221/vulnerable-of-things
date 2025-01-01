import { useRouter } from "next/router";
import Layout from "@/shared";
import { Page, Header, Label, LoadingScreen } from "@/components";
import { styled, useTheme } from "@mui/material/styles";
import { upperCase, capitalize } from "lodash";
import { FaBug } from "react-icons/fa";
import { Stack, Container, Box, Card, Grid, Typography, CardHeader, CardContent, Divider, Table, TableRow, TableBody, TableCell, TableHead } from "@mui/material";

import { useVulnerability } from "@/hooks/";
import { fDate } from "@/utils/format";


const RootStyle = styled(Container)(({ theme }) => ({
    height: "100%",
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(15),
    },

    [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(10),
    },
}));



export default function Vulnerability() {
    const theme = useTheme();
    const router = useRouter();
    const { id } = router.query;


    const {vulnerability, isLoading} = useVulnerability(id);

    if (!vulnerability) {
        return <LoadingScreen str={'Loading'} />;
    }
    const affectedProducts = vulnerability.affected;
    const references = vulnerability.references;
    const metrics = vulnerability.metrics;
    
   
    return (


        <Page title={id}>
           {
            isLoading ? <LoadingScreen str={'Loading'} /> : (
                <RootStyle maxWidth={"lg"}>
                <Header
                    links={[
                        { name: "Vulnerabilities", href: "/" },
                        { name: id }
                    ]}
                />

                <Stack direction="row" spacing={1} component={'h2'} sx={{ mb: 3 }}>
                    <FaBug size={30} style={{ transform: 'rotate(180deg)' }} />
                    <Typography variant="span" fontSize={25} fontWeight="bold" gutterBottom>
                        {id} {'Detail'}
                    </Typography>
                </Stack>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardHeader
                                title={upperCase('Description')}
                            // subheader={vulnerability?.title ?? "Loading "}
                            />

                            <Divider orientation="horizontal" flexItem variant="middle" sx={{ mt: 2 }} />

                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {vulnerability.description ?? 'lorem ipsum dolor sit amet consectetur adipisicing elit. Eos perspiciatis ea similique repudiandae error, iusto autem.'}
                                </Typography>
                            </CardContent>
                        </Card>
                        {/* Severity with cvss, vector and score */}

                        <Box bgcolor={theme.palette.grey[200]} sx={{ mt: 3 }} fontSize={12}>
                            <Typography variant="h5" fontWeight={600} sx={{ px: 2, pt: 2 }}>
                                {upperCase('Severity and Metrics')}
                            </Typography>
                            {/* subtitle */}
                            <Container sx={{ p: 2 }} maxWidth="lg">
                                <Grid container spacing={1} sx={{ mt: 0.2 }} >
                                    <Grid item xs={12} lg={3} >
                                        <span style={{ fontWeight: "bold" }}>CNA:&nbsp;</span>{vulnerability.sourceIdentifier ?? 'Mitre'}
                                    </Grid>

                                    <Grid item xs={12} lg={3} >
                                        <span style={{ fontWeight: "bold" }}>Base Score:&nbsp;</span>
                                        <Label
                                            style={{ borderRadius: "0" }}
                                            color={"warning"}
                                            variant="filled" >
                                            {metrics?.baseScore ?? 'N/A'} { capitalize(metrics?.severity)}
                                        </Label>
                                    </Grid>
                                    <Grid item xs={12} lg={6} >
                                        <span style={{ fontWeight: "bold" }}>Vector:&nbsp;</span>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: theme.palette.grey[500]
                                            }}
                                        >
                                            {metrics?.vector ?? 'N/A'}
                                        </span>

                                    </Grid>

                                </Grid>

                            </Container>

                        </Box>

                        {/*Affected product*/}
                        <Box fontSize={14}>
                        <Typography variant="h5" fontWeight={600} sx={{ px: 2, pt: 2, mt:3}}>
                                {upperCase('Affected Product')}
                            </Typography>
                            <Stack>

                                {/* table for affected product */}
                                <Table sx={{ mt: 3 }}>

                                    <TableHead
                                        component={'thead'}>
                                        <TableRow>
                                            <TableCell>
                                                Vendor
                                            </TableCell>
                                            <TableCell>
                                                Product
                                            </TableCell>
                                            <TableCell>
                                                Version
                                            </TableCell>
                                            <TableCell>
                                                CPE
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                        affectedProducts?.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {product.vendor}
                                                </TableCell>
                                                <TableCell>
                                                    {product.product}
                                                </TableCell>
                                                <TableCell>
                                                    {product.version}
                                                </TableCell>
                                                <TableCell>
                                                    {product.cpe}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </Stack>
                        </Box>

                        {/* References  and Solution*/}
                        <Box fontSize={14}>
                            <Typography variant="h5" fontWeight={600} sx={{ px: 2, pt: 2, mt:3}}>
                                {upperCase('References')}
                            </Typography>
                            <Stack>

                                {/* table for references */}
                                <Table sx={{ mt: 3 }}>

                                    <TableHead
                                        component={'thead'}>
                                        <TableRow>
                                            <TableCell>
                                                Hyperlink
                                            </TableCell>
                                            {/* <TableCell>
                                                Source
                                            </TableCell> */}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {references?.map((reference, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <a href={reference} target="_blank" rel="noreferrer">
                                                        {reference}
                                                    </a>
                                                </TableCell>
                                                {/* <TableCell>
                                                    {reference.source}
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </Stack>
                        </Box>


                    </Grid>


                    <Grid item xs={12} md={4}>

                        <Stack spacing={3} direction="column">
                            <Card >
                                <CardHeader title={upperCase('Quick info')} />
                                <Divider orientation="horizontal" flexItem variant="middle" sx={{ mt: 2 }} />
                                <CardContent >
                                    <Typography variant="body1" fontSize={14} gutterBottom>
                                        <span style={{ fontWeight: "bold" }}>Published:&nbsp;</span> {(vulnerability.published && fDate(vulnerability.published)) ?? 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" fontSize={14} gutterBottom>
                                        <span style={{ fontWeight: "bold" }}>Modified:&nbsp;</span> {(vulnerability.updated && fDate(vulnerability.updated)) ?? 'N/A'}
                                    </Typography>
                                    <Typography variant="body1" fontSize={14} gutterBottom>
                                        <span style={{ fontWeight: "bold" }}>Source:&nbsp;</span> {'nvd@nist.gov'}
                                    </Typography>
                                    {/* Weakness */}
                                    <Typography variant="body1" fontSize={14} gutterBottom>
                                        <span style={{ fontWeight: "bold" }}>Weakness:&nbsp;</span> {
                                        <a href={`https://cwe.mitre.org/data/definitions/${(vulnerability.weakness).split('-')[1]}`} target="_blank" rel="noreferrer">
                                            {vulnerability.weakness}
                                        </a>
                                         ?? 'N/A'
                                         }
                                    </Typography>
                                </CardContent>
                            </Card>


                        </Stack>

                    </Grid>
                </Grid>
            </RootStyle>
            )
           }
        </Page>


    );
}

Vulnerability.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
