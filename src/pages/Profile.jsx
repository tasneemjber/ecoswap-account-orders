import { useState } from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  Stack,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Container,
  Alert,
} from "@mui/material";
import {
  EditOutlined,
  ShoppingBagOutlined,
  FavoriteBorder,
  RateReviewOutlined,
  LogoutOutlined,
  VerifiedUser,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { initialUserProfile } from "../data/mockData";

const getStoredProfile = () => {
  if (typeof window === "undefined") return initialUserProfile;

  const stored = localStorage.getItem("ecoswap_user");
  if (!stored) return initialUserProfile;

  try {
    const parsed = JSON.parse(stored);
    return parsed || initialUserProfile;
  } catch (e) {
    console.error("Error loading profile", e);
    return initialUserProfile;
  }
};

function Profile() {
  const navigate = useNavigate();
  const initialProfile = getStoredProfile();
  const [user, setUser] = useState(initialProfile);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState(initialProfile);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSaveProfile = () => {
    setUser(formData);
    localStorage.setItem("ecoswap_user", JSON.stringify(formData));
    setOpenEdit(false);
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("ecoswap_user");
    navigate("/");
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#1f2937",
            mb: 3.5,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          My Profile
        </Typography>

        {successMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            {successMsg}
          </Alert>
        )}

        {/* Profile Card */}
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            bgcolor: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            mb: 3.5,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 84,
                height: 84,
                bgcolor: "#15803d",
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {user.name ? user.name.slice(0, 2).toUpperCase() : "AM"}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={1}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
                    {user.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Chip
                      icon={<VerifiedUser style={{ fontSize: 14, color: "#15803d" }} />}
                      label={user.sustainabilityBadge || "Eco Champion 🌿"}
                      sx={{
                        bgcolor: "#bbf7d0",
                        color: "#15803d",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: 24,
                        borderRadius: "50px",
                      }}
                    />
                  </Stack>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<EditOutlined />}
                  onClick={() => setOpenEdit(true)}
                  sx={{
                    borderColor: "#15803d",
                    color: "#15803d",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2.5,
                    py: 0.6,
                    fontSize: "0.85rem",
                    "&:hover": {
                      borderColor: "#166534",
                      bgcolor: "rgba(21, 128, 61, 0.04)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Stack>

              <Grid container spacing={2} sx={{ mt: 2, color: "#4b5563", fontSize: "0.875rem" }}>
                <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={1}>
                  <EmailOutlined fontSize="small" sx={{ color: "#15803d" }} />
                  <Typography variant="body2">{user.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={1}>
                  <PhoneOutlined fontSize="small" sx={{ color: "#15803d" }} />
                  <Typography variant="body2">{user.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} display="flex" alignItems="center" gap={1}>
                  <LocationOnOutlined fontSize="small" sx={{ color: "#15803d" }} />
                  <Typography variant="body2">{user.address}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Card>

        {/* Quick Navigation Cards */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => navigate("/orders")}
              sx={{
                p: 3,
                borderRadius: "20px",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#15803d", transform: "translateY(-2px)" },
              }}
            >
              <ShoppingBagOutlined sx={{ fontSize: 32, color: "#15803d", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                My Orders
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280", display: "block", mt: 0.5 }}>
                Track and review purchases
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => navigate("/wishlist")}
              sx={{
                p: 3,
                borderRadius: "20px",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#15803d", transform: "translateY(-2px)" },
              }}
            >
              <FavoriteBorder sx={{ fontSize: 32, color: "#15803d", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                Wishlist
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280", display: "block", mt: 0.5 }}>
                View your saved items
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => navigate("/reviews")}
              sx={{
                p: 3,
                borderRadius: "20px",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#15803d", transform: "translateY(-2px)" },
              }}
            >
              <RateReviewOutlined sx={{ fontSize: 32, color: "#15803d", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                My Reviews
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280", display: "block", mt: 0.5 }}>
                Ratings and feedback
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={handleLogout}
              sx={{
                p: 3,
                borderRadius: "20px",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#dc2626", transform: "translateY(-2px)" },
              }}
            >
              <LogoutOutlined sx={{ fontSize: 32, color: "#dc2626", mb: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#dc2626" }}>
                Logout
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280", display: "block", mt: 0.5 }}>
                Sign out of account
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111827" }}>
          Edit Profile Information
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              size="small"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              fullWidth
              size="small"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              size="small"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              label="Shipping Address"
              fullWidth
              multiline
              rows={2}
              size="small"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEdit(false)} sx={{ textTransform: "none", color: "#6b7280" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            sx={{
              bgcolor: "#15803d",
              color: "#ffffff",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              boxShadow: "none",
              "&:hover": { bgcolor: "#166534" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default Profile;