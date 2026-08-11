import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  HourglassEmpty,
} from "@mui/icons-material";
import Layout from "../components/Layout";

const mockOrders = [
  {
    id: "#ORD-12345",
    date: "Placed on Oct 24, 2024",
    status: "Delivered",
    statusType: "delivered",
    price: "$145.00",
    isPrimaryButton: true,
    items: [
      { title: "Vintage Denim Jacket", price: "$85.00", quantity: 1, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=150&q=80" },
      { title: "Eco Cotton T-Shirt", price: "$60.00", quantity: 1, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80" },
    ],
  },
  {
    id: "#ORD-12346",
    date: "Placed on Oct 28, 2024",
    status: "Shipped",
    statusType: "shipped",
    price: "$42.50",
    isPrimaryButton: false,
    items: [
      { title: "Bamboo Fiber Keyboard", price: "$42.50", quantity: 1, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=150&q=80" },
    ],
  },
  {
    id: "#ORD-12347",
    date: "Placed on Oct 30, 2024",
    status: "Processing",
    statusType: "processing",
    price: "$89.99",
    isPrimaryButton: false,
    items: [
      { title: "Upcycled Backpack", price: "$89.99", quantity: 1, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80" },
    ],
  },
];

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);

  const renderStatusChip = (type, label) => {
    if (type === "delivered") {
      return (
        <Chip
          icon={<CheckCircle style={{ color: "#ffffff", fontSize: 14 }} />}
          label={label}
          sx={{
            bgcolor: "#22c55e",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
            borderRadius: "50px",
            px: 0.5,
            "& .MuiChip-icon": { marginLeft: "6px" },
          }}
        />
      );
    }

    if (type === "shipped") {
      return (
        <Chip
          icon={<LocalShipping style={{ color: "#15803d", fontSize: 14 }} />}
          label={label}
          sx={{
            bgcolor: "#bbf7d0",
            color: "#15803d",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
            borderRadius: "50px",
            px: 0.5,
            "& .MuiChip-icon": { marginLeft: "6px" },
          }}
        />
      );
    }

    // processing
    return (
      <Chip
        icon={<HourglassEmpty style={{ color: "#4b5563", fontSize: 14 }} />}
        label={label}
        sx={{
          bgcolor: "#e5e7eb",
          color: "#374151",
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 24,
          borderRadius: "50px",
          px: 0.5,
          "& .MuiChip-icon": { marginLeft: "6px" },
        }}
      />
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#1f2937",
            mb: 3.5,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          Order History
        </Typography>

        {/* Orders Card Stack */}
        <Stack spacing={2.5}>
          {mockOrders.map((order) => (
            <Card
              key={order.id}
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: "20px",
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#d1d5db",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={2}
              >
                {/* Left Side: Order Number, Badge, Date */}
                <Box>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        fontSize: "1.1rem",
                      }}
                    >
                      {order.id}
                    </Typography>
                    {renderStatusChip(order.statusType, order.status)}
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", mt: 0.6, fontSize: "0.85rem" }}
                  >
                    {order.date}
                  </Typography>
                </Box>

                {/* Right Side: Price & View Details Button */}
                <Stack
                  direction={{ xs: "row", sm: "column" }}
                  alignItems={{ xs: "center", sm: "flex-end" }}
                  justifyContent={{ xs: "space-between", sm: "flex-start" }}
                  width={{ xs: "100%", sm: "auto" }}
                  spacing={1.5}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "1.15rem",
                    }}
                  >
                    {order.price}
                  </Typography>

                  {order.isPrimaryButton ? (
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDetails(order)}
                      sx={{
                        bgcolor: "#15803d",
                        color: "#ffffff",
                        borderRadius: "50px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 0.6,
                        fontSize: "0.85rem",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#166534",
                          boxShadow: "none",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDetails(order)}
                      sx={{
                        borderColor: "#15803d",
                        color: "#15803d",
                        borderRadius: "50px",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 0.6,
                        fontSize: "0.85rem",
                        "&:hover": {
                          borderColor: "#166534",
                          bgcolor: "rgba(21, 128, 61, 0.04)",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* Order Details Dialog */}
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontWeight: 700, color: "#111827" }}>
              Order Breakdown - {selectedOrder.id}
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedOrder.date} • Total: <strong>{selectedOrder.price}</strong>
              </Typography>
              <Stack spacing={2}>
                {selectedOrder.items.map((item, index) => (
                  <Grid container key={index} spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          width: "100%",
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#111827" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#15803d" }}>
                        {item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseDetails}
                sx={{ borderRadius: "50px", color: "#15803d", textTransform: "none", fontWeight: 600 }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Layout>
  );
}

export default Orders;
