import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../components/Link";
import TopBar from "../components/layout/Header";
import OrderTimeline from "../components/OrderTimeline";
import { useGetOrder } from "../hooks/useOrder";
import Loading from "../components/Loader";

export default function Admin() {
  const { data, isLoading } = useGetOrder();
  return (
    <Loading isLoading={isLoading}>
      <TopBar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Admin page
          </Typography>
          <OrderTimeline data={data} />
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the main page
          </Button>
        </Box>
      </Container>
    </Loading>
  );
}
