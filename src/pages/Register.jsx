import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { registerUser } from "../services/auth";
import { dispatchAccountEvent, ACCOUNT_EVENTS } from "../services/eventBus";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = registerUser({ name, email, phone, password });
      dispatchAccountEvent(ACCOUNT_EVENTS.USER_REGISTER, { name: user.name, email: user.email });
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 6 },
          bgcolor: "#f9fafb",
        }}
      >
        <Card
          component="form"
          onSubmit={handleRegister}
          elevation={0}
          sx={{
            width: { xs: "100%", sm: 460 },
            p: { xs: 3, sm: 4 },
            borderRadius: "24px",
            bgcolor: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          }}
        >
          <Stack spacing={2.5} alignItems="center">
           

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
                Create Account
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: "#6b7280" }}>
                Join EcoSwap Marketplace today.
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>{error}</Alert>}

            <TextField
              fullWidth
              size="small"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            <TextField
              fullWidth
              size="small"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            <TextField
              fullWidth
              size="small"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.1,
                bgcolor: "#15803d",
                color: "#ffffff",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                boxShadow: "none",
                "&:hover": { bgcolor: "#166534" },
              }}
            >
              Create Account
            </Button>

            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Box
                component="span"
                onClick={() => navigate("/")}
                sx={{ color: "#15803d", fontWeight: 700, cursor: "pointer" }}
              >
                Sign In
              </Box>
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Layout>
  );
}

export default Register;
