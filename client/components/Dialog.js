import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

export default function DialogView({ open = true, children, onClose, title }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ width: 500, height: 300 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
