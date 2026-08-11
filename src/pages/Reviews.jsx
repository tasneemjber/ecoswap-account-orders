import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Rating,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Layout from "../components/Layout";
import { initialReviews } from "../data/mockData";

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [openModal, setOpenModal] = useState(false);
  const [newReview, setNewReview] = useState({ productTitle: "", rating: 5, comment: "" });
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.productTitle || !newReview.comment) return;

    const reviewToAdd = {
      id: `REV-${Math.floor(100 + Math.random() * 900)}`,
      productTitle: newReview.productTitle,
      productImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
      rating: Number(newReview.rating),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      comment: newReview.comment,
      verifiedPurchase: true,
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ productTitle: "", rating: 5, comment: "" });
    setOpenModal(false);
    setAlertMsg("Review submitted successfully!");
    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3.5, gap: 2 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#1f2937",
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              My Reviews
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
              Your trusted feedback and recent product experiences.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
            sx={{
              bgcolor: "#15803d",
              color: "#ffffff",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 0.8,
              boxShadow: "none",
              ml: { xs: 0, sm: "auto" },
              "&:hover": { bgcolor: "#166534" },
            }}
          >
            Write a Review
          </Button>
        </Stack>

        {alertMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            {alertMsg}
          </Alert>
        )}

        <Stack spacing={2.5}>
          {reviews.map((review) => (
            <Card
              key={review.id}
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
              <Grid container spacing={2.5} alignItems="center">
                <Grid size={{ xs: 12, sm: 3, md: 2.2 }}>
                  <Box
                    component="img"
                    src={review.productImage}
                    alt={review.productTitle}
                    sx={{ width: "100%", height: 92, objectFit: "cover", borderRadius: 3 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 9.8 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
                      {review.productTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 0.75, flexWrap: "wrap" }}>
                    <Rating value={review.rating} size="small" readOnly />
                    {review.verifiedPurchase && (
                      <Typography variant="caption" sx={{ color: "#15803d", fontWeight: 600 }}>
                        Verified Purchase
                      </Typography>
                    )}
                  </Stack>

                  <Typography variant="body2" sx={{ color: "#4b5563", mt: 0.5 }}>
                    “{review.comment}”
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Container>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111827" }}>Write a Product Review</DialogTitle>
        <DialogContent dividers component="form" onSubmit={handleSubmitReview}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Product Name"
              fullWidth
              size="small"
              required
              value={newReview.productTitle}
              onChange={(e) => setNewReview({ ...newReview, productTitle: e.target.value })}
            />
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600, color: "#374151" }}>
                Rating
              </Typography>
              <Rating
                value={Number(newReview.rating)}
                onChange={(_, val) => setNewReview({ ...newReview, rating: val })}
              />
            </Box>
            <TextField
              label="Comment"
              fullWidth
              multiline
              rows={3}
              required
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </Stack>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ textTransform: "none", color: "#6b7280" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#15803d", color: "#ffffff", borderRadius: "50px", textTransform: "none", fontWeight: 600 }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default Reviews;
