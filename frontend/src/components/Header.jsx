import PropTypes from "prop-types";
import isString from "lodash/isString";
// @mui
import { Box, Link } from "@mui/material";
//
import Breadcrumbs from "./Breadcrumbs";

// ----------------------------------------------------------------------

export default function Header({
  links,
  moreLink = "" || [],
  sx,
  ...other
}) {

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs links={links} {...other} />
        </Box>

      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href, index) => (
            <Link
              noWrap
              key={index}
              href={href}
              variant="body2"
              target="_blank"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}

Header.propTypes = {
    links: PropTypes.array,
    moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    sx: PropTypes.object,
};
  