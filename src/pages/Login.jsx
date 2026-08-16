import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { loginUser } from "../services/auth";
import { dispatchAccountEvent, ACCOUNT_EVENTS } from "../services/eventBus";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex.morgan@ecoswap.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = loginUser({ email, password });
      dispatchAccountEvent(ACCOUNT_EVENTS.USER_LOGIN, { name: user.name, email: user.email });
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
          px: 2,
          py: 6,
        }}
      >
        <Card
          component="form"
          onSubmit={handleLogin}
          elevation={0}
          sx={{
            width: { xs: "100%", sm: 420 },
            p: { xs: 3.5, sm: 4 },
            borderRadius: "24px",
            bgcolor: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <Stack spacing={2.5} alignItems="center">
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Sign in to view your orders and profile.
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ width: "100%", borderRadius: 2 }}>{error}</Alert>}

            <TextField
              fullWidth
              size="small"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              size="small"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              Sign In
            </Button>

            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Box
                component="span"
                onClick={() => navigate("/register")}
                sx={{ color: "#15803d", fontWeight: 700, cursor: "pointer" }}
              >
                Create Account
              </Box>
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Layout>
  );
}

export default Login;