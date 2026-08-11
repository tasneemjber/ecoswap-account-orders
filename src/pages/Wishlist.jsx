import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  IconButton,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Layout from "../components/Layout";
import { dispatchAccountEvent, ACCOUNT_EVENTS } from "../services/eventBus";

const initialWishlistItems = [
  {
    id: "WISH-1",
    title: "Vintage Denim Jacket",
    tag: "Good Condition • Size M",
    price: "$45.00",
    rawPrice: 45.00,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "WISH-2",
    title: "Upcycled Glass Vases",
    tag: "Set of 3 • Handmade",
    price: "$28.00",
    rawPrice: 28.00,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "WISH-3",
    title: "Refurbished Film Camera",
    tag: "Tested & Working",
    price: "$120.00",
    rawPrice: 120.00,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "WISH-4",
    title: "Bamboo Cutlery Set",
    tag: "Zero Waste • New",
    price: "$15.00",
    rawPrice: 15.00,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80",
  },
];

function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlistItems);
  const [alertMsg, setAlertMsg] = useState("");

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    dispatchAccountEvent(ACCOUNT_EVENTS.WISHLIST_UPDATED, {
      items: updated,
      count: updated.length,
    });
    setAlertMsg("Item removed from your wishlist.");
    setTimeout(() => setAlertMsg(""), 3000);
  };

  const handleAddToCart = (product) => {
    dispatchAccountEvent(ACCOUNT_EVENTS.ADD_TO_CART, {
      productId: product.id,
      title: product.title,
      price: product.rawPrice,
      image: product.image,
      quantity: 1,
      timestamp: new Date().toISOString(),
    });

    setAlertMsg(`Added "${product.title}" to your Shopping Cart! 🛒`);
    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        {/* Page Title & Subtitle */}
        <Box sx={{ mb: 3.5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#1f2937",
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
            }}
          >
            Your Wishlist
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mt: 0.5, fontSize: "0.9rem" }}
          >
            Keep track of your favorite sustainable finds.
          </Typography>
        </Box>

        {alertMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            {alertMsg}
          </Alert>
        )}

        {/* Wishlist Grid */}
        {wishlist.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: "20px",
              bgcolor: "#ffffff",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Explore products in the catalog to save your favorite items.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={2.5}>
            {wishlist.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "20px",
                    bgcolor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#d1d5db",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  {/* Image Container with Delete Button */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 190,
                      bgcolor: "#f9fafb",
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemove(product.id)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "#ffffff",
                        color: "#4b5563",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                        "&:hover": {
                          bgcolor: "#fee2e2",
                          color: "#dc2626",
                        },
                      }}
                    >
                      <DeleteOutlined fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Details Content */}
                  <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        fontSize: "0.95rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#15803d",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        mt: 0.8,
                        mb: 2.5,
                      }}
                    >
                      {product.tag}
                    </Typography>

                    {/* Bottom Row: Price & Add Button with Spacing */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ mt: "auto", pt: 1 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#111827",
                          fontSize: "1.05rem",
                        }}
                      >
                        {product.price}
                      </Typography>

                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(product)}
                        startIcon={<ShoppingCartOutlined style={{ fontSize: 16 }} />}
                        sx={{
                          bgcolor: "#22c55e",
                          color: "#ffffff",
                          borderRadius: "50px",
                          textTransform: "none",
                          fontWeight: 600,
                          px: 2.5,
                          py: 0.6,
                          fontSize: "0.85rem",
                          boxShadow: "none",
                          gap: 0.5,
                          "& .MuiButton-startIcon": {
                            marginRight: "6px",
                          },
                          "&:hover": {
                            bgcolor: "#16a34a",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
}

export default Wishlist;
