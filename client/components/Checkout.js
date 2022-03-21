import * as React from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import DialogView from "./Dialog";
import { ListItemButton, ListItemText } from "@mui/material";
import { useOrder } from "../hooks/useOrder";

export default function Checkout({ onClose, cart }) {
  const { mutate: orderFn, status, isSuccess, isError, isLoading } = useOrder();

  React.useEffect(() => {
    if (status === "success") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <DialogView onClose={onClose} title="Checkout">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        {isError ? (
          <Alert severity="error">Error occurred, please try again later</Alert>
        ) : null}

        {isSuccess ? <Alert severity="success">Yay !! </Alert> : null}

        {Object.keys(cart).map((item) => (
          <ListItemButton
            component="a"
            key={cart[item].name}
            href="#simple-list"
          >
            <ListItemText primary={`$${cart[item].price} ${cart[item].name}`} />
          </ListItemButton>
        ))}
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          onClick={() => orderFn(cart)}
        >
          Order
        </LoadingButton>
      </Box>
    </DialogView>
  );
}
