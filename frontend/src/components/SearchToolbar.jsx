import PropTypes from "prop-types";
import { Stack, InputAdornment, TextField, MenuItem} from "@mui/material";
// components
import Iconify from "@/components/Iconify";

// ----------------------------------------------------------------------


export default function SearchToolbar({
  filterProduct,
  // filterVendor,
  onFilterProduct,
  // onFilterVendor,
  options,
}) {



  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{px:2 , py: 3 }}>
      {/* <TextField
        fullWidth
        select
        value={filterVendor}
        onChange={onFilterVendor}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260, overflowY: 'auto' } },
            onScroll: ()=> {console.log('scrolling')},
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {sentenceCase(option)}
          </MenuItem>
        ))}
      </TextField> */}

      <TextField
        fullWidth
        value={filterProduct}
        onChange={(event) => onFilterProduct(event.target.value)}
        placeholder="
        Product or CVE search "
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
SearchToolbar.propTypes = {
  filterProduct: PropTypes.string,
  // filterVendor: PropTypes.string,
  onFilterProduct: PropTypes.func,
  // onFilterVendor: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};
