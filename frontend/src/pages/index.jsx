import { useState} from "react";
import { useRouter } from 'next/router';
import { styled, useTheme } from "@mui/material/styles";
import Layout from "@/shared";
import Page from "@/components/Page";
import {
  Container, Box, Stack, Grid, Button, Divider, Tabs, Tab, TableContainer,
  TablePagination, Card, TableBody, Table,
} from "@mui/material";
//components
import { TableEmptyRows, TableHeadCustom, TableNoData, TableRowComponent } from '@/components/table';
import Scrollbar from '@/components/Scrollbar';
import SearchToolbar from "@/components/SearchToolbar";
import { GridSummary, LoadingScreen } from "@/components";
import { IotIllustration, BugIllustration, ShieldIllustration } from "@/assets";

// hooks
import useTabs from '@/hooks/useTabs';
import useTable, { getComparator, emptyRows } from '@/hooks/useTable';

//api
import useVulnerabilities from "@/hooks/useVulnerabilities";

const products = new Set();
const vendors = new Set();
let totalCount = 0;


const CATEGORY_DEVICES = [
  "All Ecosystems", "Router", "Smartphone", "Smartwatch","TV", "Camera","Tablet", 'Sensor', 'Laptop', 'Desktop', 'Server', 'Printer', 'Firewall',  'Vehicle', 'Drone', "Others"];


const RootStyle = styled(Container)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(15),
  },

  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(10),
  },
}));

  


const TABLE_HEAD = [
  { id: 'CveID', label: 'CVE', align: 'left' },
  { id: 'Description', label: 'Description', align: 'left' },
  { id: 'Product', label: 'Product', align: 'left' },
  { id: 'Gravity', label: 'Gravity', align: 'left' },
  { id: 'Severity', label: 'Severity', align: 'center' },
  { id: 'Publication_date', label: 'Published', align: 'right' },
  { id: 'Last_update', label: 'Modified', align: 'right' },
];






export default function Home() {

  const theme = useTheme();
  const { push } = useRouter();


  const [filterProduct, setFilterProduct] = useState("");
  const [selectedMenu, setSelectedMenu] = useState('All Ecosystems');
  const { currentTab: filterMenu, onChangeTab: onChangeFilterMenu } = useTabs('All Ecosystems');

  const { page, orderBy, rowsPerPage, order, setPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({ 
    defaultOrderBy: 'Publication_date', 
    defaultOrder: 'desc', 
    defaultCurrentPage: 0, 
    defaultRowsPerPage: 10 
  });

  const { vulnerabilities, isLoading:loading} = useVulnerabilities();
  // Vérifier si les données sont disponibles
  if (!vulnerabilities) {
        return <LoadingScreen str="Loading" />
  }

   // vulnerabilities est un tableau d'objets
   if (vulnerabilities) {
    totalCount = vulnerabilities.length;


    vulnerabilities.filter((vuln) => {
      const product = vuln.Product;
      const vendor = vuln.Vendor;

      if (!products.has(product)) {
        products.add(product);
      }

      if (!vendors.has(vendor)) {
        vendors.add(vendor);
      }
    });

  }
   


  const handleFilterProduct = (filterProduct) => {
    setFilterProduct(filterProduct);
    setPage(0);

  };



  const handleViewRow = (id) => {
    push(`/browse/${id}`);
  }


  // fonction permettant de filtrer et de trier un tableau
  const dataFiltered = applySortFilter({
    tableData: vulnerabilities,
    comparator: getComparator(order, orderBy),
    filterProduct,
    filterMenu,
    selectedMenu,
  });

  const HEIGHT = 72 * Math.min(rowsPerPage, dataFiltered.length);
  const isNotFound = dataFiltered.length === 0;

  return (

    <Page title="VoT">
     {
      loading  ? <LoadingScreen str="Loading" /> : (
        <RootStyle maxWidth="xl">


        <Grid container spacing={3} sx={{ mb: 5, px: 1, py: 1 }}>
          <Grid item xs={12} md={4}>
            <GridSummary title="Total Vendors" total={vendors.size} icon={<ShieldIllustration />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <GridSummary title="Total Products" total={products.size} icon={<IotIllustration />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <GridSummary title="Total Vulnerabilities" total={totalCount} icon={<BugIllustration />} />
          </Grid>


        </Grid>


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


          {/* Ecosystems  Tabs desktop  */}
          <Stack spacing={2} direction='row' display={{ xs: 'none', lg: 'flex' }} sx={{ px: 2, py: 3 }}>
            {/* extract first */}
            {CATEGORY_DEVICES.slice(0, 1).map((device, index) => (
              <Button
                key={index}
                variant={selectedMenu === device ? "contained" : "outlined"}
                size="small"
                sx={{
                  color: selectedMenu === device ? '#fff' : '#000',
                  borderColor: selectedMenu === device ? '#fff' : '#000',
                  borderRadius: 2,
                  fontWeight: 400,
                  fontSize: 12,
                  textTransform: 'none'
                }}
                style={{ backgroundColor: selectedMenu == device ? theme.palette.primary.darker : 'transparent' }}
                onClick={() => setSelectedMenu(device)}
              >
                {device}
              </Button>
            ))}
            <Divider orientation="vertical" flexItem />
            {/* extract others */}
            {CATEGORY_DEVICES.slice(1).map((device, index) => (
              <Button
                key={index}
                variant={selectedMenu === device ? "contained" : "outlined"}
                size="small"
                sx={{
                  color: selectedMenu === device ? '#fff' : '#000',
                  borderColor: selectedMenu === device ? '#fff' : '#000',
                  borderRadius: 2,
                  fontWeight: 400,
                  fontSize: 12,
                  textTransform: 'none'
                }}
                style={{ backgroundColor: selectedMenu == device ? theme.palette.primary.darker : 'transparent' }}
                onClick={() => setSelectedMenu(device)}

              >
                {device}
              </Button>
            ))}
          </Stack>


          {/* Ecosystems  Tabs mobile & tablets  */}
          <Tabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={filterMenu}
            onChange={onChangeFilterMenu}
            textColor="primary"
            indicatorColor="primary"
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            {CATEGORY_DEVICES.map((device, index) => (
              <Tab disableRipple key={index} label={device} value={device} />
            ))}
          </Tabs>
          {/* End Ecosystems  */}



          {/* fullwidth Vulnerabilities list */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={vulnerabilities && vulnerabilities.totalResults}
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
      )
     }
    </Page>


  );
}



// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterProduct, filterMenu, selectedMenu }) {
  // Stabiliser les données
  const stabilizedThis = tableData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  tableData = stabilizedThis.map(([el]) => el);

  // Filtrer par produit
  if (filterProduct) {
    const filterProductLowerCase = filterProduct.toLowerCase();
    tableData = tableData.filter((item) =>
      [item.Product, item.CveID, item.Description].some((prop) =>
        prop.toLowerCase().includes(filterProductLowerCase)
      )
    );
  }

  // Filtrer par menu sélectionné
  if (filterMenu !== 'All Ecosystems') {
    const selectedMenuLowerCase = filterMenu.toLowerCase();
    if (filterMenu === 'Others') {
      tableData = tableData.filter((item) =>
        !CATEGORY_DEVICES.includes(item.Product.toLowerCase())
      );
    } else {
      tableData = tableData.filter((item) =>
        [item.Product, item.Description].some((prop) =>
          prop.toLowerCase().includes(selectedMenuLowerCase)
        )
      );
    }
  }

  // Filtrer par menu sélectionné
  if (selectedMenu !== 'All Ecosystems') {
    const selectedMenuLowerCase = selectedMenu.toLowerCase();
    if (selectedMenu === 'Others') {
      // Extraire les éléments correspondant à "Others"
      const others = tableData.filter((item) =>
        ![item.Product, item.Description].some((prop) =>
          prop.toLowerCase().includes(selectedMenuLowerCase)
        )
      );
      // Filtrer les éléments qui ne sont pas inclus dans CATEGORY_DEVICES
      tableData = tableData.filter((item) =>
        [item.Product, item.Description].some((prop) =>
          prop.toLowerCase().includes(selectedMenuLowerCase)
        )
      );
      // Ajouter les éléments "Others" à tableData
      tableData.push(...others);
    } else {
      tableData = tableData.filter((item) =>
        [item.Product, item.Description].some((prop) =>
          prop.toLowerCase().includes(selectedMenuLowerCase)
        )
      );
    }
  }



  return tableData;
}




Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
