import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = ["/", "/register"].includes(location.pathname);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f9fafb",
      }}
    >
      {!hideLayout && <Header />}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
      {!hideLayout && <Footer />}
    </Box>
  );
}

export default Layout;