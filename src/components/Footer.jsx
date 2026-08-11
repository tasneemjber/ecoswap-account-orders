import { Box, Container, Grid, Typography, Link as MuiLink, Stack } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #e0f7fa, #fff3e0)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        py: 6,
        mt: "auto",
        color: "#374151",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1: Logo & Copyright */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0f766e",
                fontSize: "1.3rem",
                letterSpacing: "-0.3px",
              }}
            >
              EcoSwap
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: "0.78rem",
                mt: 2,
                lineHeight: 1.4,
              }}
            >
              © 2024 EcoSwap Marketplace. All rights reserved.
            </Typography>
          </Grid>

          {/* Column 2: About Us & Sell an Item */}
          <Grid item xs={6} sm={2.5} md={2.5}>
            <Stack spacing={1}>
              <MuiLink
                underline="none"
                sx={{
                  color: "#374151",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#0f766e" },
                }}
              >
                About Us
              </MuiLink>
              <MuiLink
                underline="none"
                sx={{
                  color: "#374151",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#0f766e" },
                }}
              >
                Sell an Item
              </MuiLink>
            </Stack>
          </Grid>

          {/* Column 3: Sustainability & Help Center */}
          <Grid item xs={6} sm={2.5} md={2.5}>
            <Stack spacing={1}>
              <MuiLink
                underline="none"
                sx={{
                  color: "#374151",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#0f766e" },
                }}
              >
                Sustainability
              </MuiLink>
              <MuiLink
                underline="none"
                sx={{
                  color: "#374151",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#0f766e" },
                }}
              >
                Help Center
              </MuiLink>
            </Stack>
          </Grid>

          {/* Column 4: Privacy Policy */}
          <Grid item xs={6} sm={2.5} md={2.5}>
            <Stack spacing={1}>
              <MuiLink
                underline="none"
                sx={{
                  color: "#374151",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#0f766e" },
                }}
              >
                Privacy Policy
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;