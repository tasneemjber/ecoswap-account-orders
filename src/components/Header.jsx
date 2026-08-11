import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  ShoppingCartOutlined,
  PersonOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [];

  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        color: "#1f2937",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, justifyContent: "space-between" }}>
    
          <Box
            onClick={() => navigate("/orders")}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#15803d",
                letterSpacing: "-0.3px",
              }}
            >
              EcoSwap
            </Typography>
          </Box>

     
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Typography
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.95rem",
                    color: isActive ? "#15803d" : "#4b5563",
                    position: "relative",
                    "&:hover": { color: "#15803d" },
                    ...(isActive && {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        bgcolor: "#15803d",
                        borderRadius: 1,
                      },
                    }),
                  }}
                >
                  {item.label}
                </Typography>
              );
            })}
          </Box>


          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => navigate("/cart")}
              size="medium"
              sx={{ color: "#374151" }}
            >
              <ShoppingCartOutlined />
            </IconButton>

            <IconButton
              onClick={() => navigate("/profile")}
              size="medium"
              sx={{ color: "#15803d" }}
            >
              <PersonOutlined />
            </IconButton>

  
            <IconButton
              onClick={toggleMobileDrawer}
              sx={{ display: { xs: "flex", md: "none" }, color: "#374151" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>


      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileDrawer}>
        <Box sx={{ width: 240, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#15803d", mb: 2 }}>
            EcoSwap
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    toggleMobileDrawer();
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      color: location.pathname === item.path ? "#15803d" : "#374151",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
