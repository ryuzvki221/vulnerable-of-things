import { useRouter } from 'next/router';
import { styled } from "@mui/material/styles";
import { Page, Header, Label, LoadingScreen, Top5Elements, EntriesChart } from "@/components";
import Layout from "@/shared";
import { Container, Grid, Box, TableContainer, TableBody, Table, TablePagination } from "@mui/material";
//components
import { TableEmptyRows, TableHeadCustom, TableNoData, TableVendorRow } from '@/components/table';
import Scrollbar from '@/components/Scrollbar';

import useTable, { getComparator, emptyRows } from '@/hooks/useTable';

//api
import useVulnerabilities from "@/hooks/useVulnerabilities";

const TABLE_HEAD = [
    { id: 'index', label: '#', align: 'left' },

    { id: 'vendor', label: 'Vendor', align: 'left' },

    { id: 'entries', label: 'Entries', align: 'right' },
];



const RootStyle = styled(Container)(({ theme }) => ({
    height: "100%",
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(15),
    },

    [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(10),
    },
}));


export default function VendorList() {

    const { push } = useRouter();

    const { page, orderBy, rowsPerPage, order, setPage, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'entries',
        defaultOrder: 'desc',
        defaultCurrentPage: 0,
        defaultRowsPerPage: 10
    });

    const { vulnerabilities, isLoading: loading } = useVulnerabilities();
    // Vérifier si les données sont disponibles
    if (!vulnerabilities) {
        return <LoadingScreen str="Loading" />
    }

    const vendorMap = vulnerabilities.reduce((acc, vuln) => {
        const vendor = vuln.Vendor;
        acc[vendor] = (acc[vendor] || 0) + 1;
        return acc;
    }, {});

    const sortedVendors = Object.entries(vendorMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5);

    const [topFiveVendors, topFiveCounts] = sortedVendors.reduce((acc, [vendor, count]) => {
        acc[0].push(vendor);
        acc[1].push(count);
        return acc;
    }, [[], []]);


    // create table data structure 
    const vendors = Object.entries(vendorMap)
        .map(([vendor, entries]) => {
            return {
                vendor,
                entries,
            };
        });

    // apply sort filter
    const dataFiltered = applySortFilter({
        vendors,
        comparator: getComparator(order, orderBy)
    });

    const HEIGHT = 72 * Math.min(rowsPerPage, dataFiltered.length);
    const isNotFound = dataFiltered.length === 0;


    const handleViewRow = (vendor) => {
        push(`/browse/vendor/${vendor}`);
        setPage(0);
    };


    return (
        <Page title={'Vendor'}>
            {loading ? (
                <LoadingScreen str="Loading" />
            ) : (
                <RootStyle maxWidth={"lg"}>
                    <Header
                        links={[
                            { name: "Vulnerabilities", href: "/" },
                            { name: "Vendor" },
                        ]}
                    />
                    <Grid container spacing={3} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Top5Elements
                                labels={topFiveVendors}
                                data={topFiveCounts}
                                total={vulnerabilities.length}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                            <EntriesChart data={vendorMap} />
                        </Grid>
                    </Grid>

                    <Scrollbar >
                        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                            <Table >
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={dataFiltered.length}
                                // onSort={onSort}
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableVendorRow key={index} index={index} row={row} onViewRow={() => handleViewRow(row.vendor)} />
                                            );
                                        })}
                                    <TableEmptyRows height={HEIGHT} emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={dataFiltered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />
                    </Box>
                </RootStyle>
            )}
        </Page>
    );
}
VendorList.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};




// ----------------------------------------------------------------------

function applySortFilter({ vendors, comparator }) {
    const stabilizedThis = vendors.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);

}