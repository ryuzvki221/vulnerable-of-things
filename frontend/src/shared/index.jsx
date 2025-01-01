import PropTypes from "prop-types";
import MainLayout from "./main";


// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Layout({ children }) {


  return <MainLayout>{children}</MainLayout>;
  
}
