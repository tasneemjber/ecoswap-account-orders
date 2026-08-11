import { Card, Typography, Box } from "@mui/material";

function AccountCard({ icon, title, subtitle, color }) {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 86,
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid #e6f1e8",
        boxShadow: "0 8px 20px rgba(14, 76, 37, 0.06)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 24px rgba(14, 76, 37, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          color,
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: "rgba(76,175,80,0.12)",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography fontSize={14} fontWeight={700} sx={{ color: "#173722" }}>
          {title}
        </Typography>
        <Typography fontSize={11} color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  );
}

export default AccountCard;