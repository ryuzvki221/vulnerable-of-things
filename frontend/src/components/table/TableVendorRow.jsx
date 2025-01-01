import PropTypes from "prop-types";
import { sentenceCase, } from "change-case";
import { fNumber } from "@/utils/format";
// @mui
import { TableRow, TableCell, Link } from "@mui/material";


export default function TableVendorRow({ index, row, onViewRow }) {

    const { vendor,  entries} = row;


    return (
        <TableRow >
            <TableCell align="left" > {index+1}</TableCell>
            <TableCell align="left">
                <Link
                    noWrap
                    variant="body2"
                    onClick={onViewRow}
                    sx={{ color: "text.primary", cursor: "pointer" }}
                > {sentenceCase(vendor)} </Link>
            </TableCell>
            <TableCell align="right"> {fNumber(entries)} </TableCell>

        </TableRow>
    )


}

TableVendorRow.propTypes = {
    index: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    onViewRow: PropTypes.func.isRequired,
};
