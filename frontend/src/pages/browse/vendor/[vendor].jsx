import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from "@mui/material/styles";
import { Page, Header, LoadingScreen } from "@/components";
import Layout from "@/shared";
import {
    Container, Box, Grid,TableContainer,
    TablePagination, Card, TableBody, Table, Typography
} from "@mui/material";
//components
import { TableEmptyRows, TableHeadCustom, TableNoData, TableRowComponent } from '@/components/table';
import Scrollbar from '@/components/Scrollbar';

import useTable, { getComparator, emptyRows } from '@/hooks/useTable';
import { useVendors } from '@/hooks';
import SearchToolbar from "@/components/SearchToolbar";



const TABLE_HEAD = [
    { id: 'CveID', label: 'CVE', align: 'left' },
    { id: 'Description', label: 'Description', align: 'left' },
    { id: 'Product', label: 'Product', align: 'left' },
    { id: 'Gravity', label: 'Gravity', align: 'left' },
    { id: 'Severity', label: 'Severity', align: 'center' },
    { id: 'Publication_date', label: 'Published', align: 'right' },
    { id: 'Last_update', label: 'Modified', align: 'right' },
];




const RootStyle = styled(Container)(({ theme }) => ({
    height: "100%",
    paddingTop: theme.spacing(15),
    [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(10),
    },
}));


export default function Vendor() {

    const router = useRouter();
    const { vendor } = router.query;

    const [filterProduct, setFilterProduct] = useState("");
    const { page, orderBy, rowsPerPage, order, setPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({
        defaultOrderBy: 'Publication_date',
        defaultOrder: 'desc',
        defaultCurrentPage: 0,
        defaultRowsPerPage: 10
    });



    const { vulnerabilities, isLoading: loading } = useVendors(vendor);
    // Vérifier si les données sont disponibles
    if (loading || !vulnerabilities) {
        return <LoadingScreen str="Loading" />;
    }

    const handleFilterProduct = (filter) => {
        setFilterProduct(filter);
        setPage(0);
    };

    const handleViewRow = (id) => {
        router.push(`/browse/${id}`);
    }

    const dataFiltered = applySortFilter({
        vulnerabilities,
        filterProduct,
        comparator: getComparator(order, orderBy),
    });

    const HEIGHT = 72 * Math.min(rowsPerPage, dataFiltered.length);
    const isNotFound = dataFiltered.length === 0;



    return (


        <Page title={vendor}>

            <RootStyle maxWidth={"lg"}>
                <Header
                    links={[
                        { name: "Vulnerabilities", href: "/" },
                        { name: "Vendor", href: "/browse/vendor" },
                        { name: 'List', },
                    ]}
                />

                <Typography variant="span" fontSize={25} fontWeight="bold" gutterBottom>
                    {vendor?.toString().toLocaleUpperCase()}
                </Typography>


                <Card sx={{ mx: 1, my: 1 }}>

                    {/* Toolbar */}
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={8}>
                            <SearchToolbar
                                filterProduct={filterProduct}
                                onFilterProduct={handleFilterProduct}
                            />
                        </Grid>

                    </Grid>
                    {/* End toolbar */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                            <Table >
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={dataFiltered.length}
                                    onSort={onSort}

                                />
                                <TableBody>

                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRowComponent key={row.CveID} row={row} onViewRow={() => handleViewRow(row.CveID)} />
                                        ))}

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

                </Card>

            </RootStyle>
        </Page>
    );
}

Vendor.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

function applySortFilter({ vulnerabilities, comparator, filterProduct }) {
    const stabilizedThis = vulnerabilities.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    vulnerabilities = stabilizedThis.map((el) => el[0]);

    if (filterProduct) {
        const filterProductLowerCase = filterProduct.toLowerCase();
        vulnerabilities = vulnerabilities.filter((item) =>
            [item.Product, item.CveID, item.Description].some((prop) =>
                prop.toLowerCase().includes(filterProductLowerCase)
            )
        );
    }

    return vulnerabilities;
}