import PropTypes from "prop-types";
import { sentenceCase, } from "change-case";
import { fDate } from "@/utils/format";
// @mui
import { TableRow, TableCell, Link } from "@mui/material";
import { Label } from "@/components";


export default function TableRowComponent({ row, onViewRow }) {

    const { CveID, Description, Product, Severity, Gravity, Publication_date, Last_update } = row;


    return (
        <TableRow hover>
            <TableCell align="left">
                <Link
                    noWrap
                    variant="body2"
                    onClick={onViewRow}
                    sx={{ color: "text.disabled", cursor: "pointer" }}
                >
                    {CveID}
                </Link>
            </TableCell>
            <TableCell align="left">

                <Link
                    noWrap
                    variant="body2"
                    onClick={onViewRow}
                    sx={{ color: "text.primary", cursor: "pointer" }}
                >
                    {sentenceCase(Description).substring(0, 50)} ...
                </Link>
            </TableCell>
            <TableCell align="left"> { sentenceCase(Product)} </TableCell>
            <TableCell align="left"> {Gravity} </TableCell>
            <TableCell align="center">
                <Label
                    variant="ghost"
                    color={((`${Severity}`.toLocaleLowerCase() === "high"  && "error") || (`${Severity}`.toLocaleLowerCase()  === "medium" && "warning") || "success")}
                >
                    {Severity}
                </Label>
            </TableCell>
            {/* format date */}
            <TableCell align="right"> {fDate(Publication_date)} </TableCell>
            <TableCell align="right"> {fDate(Last_update)} </TableCell>


        </TableRow>
    )


}

TableRowComponent.propTypes = {
    row: PropTypes.object.isRequired,
    onViewRow: PropTypes.func.isRequired,
};
