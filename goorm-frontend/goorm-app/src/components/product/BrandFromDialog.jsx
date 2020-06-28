import React, { useState } from "react";
import product_api from "api/ProductAPI";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function BrandFormDialog(props) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    await product_api
      .createBrand({ name: brand })
      .then((result) => {
        console.log(result);
        handleClose();
        setBrand("");
        props.get_brands();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add brand
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Brand</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>추가할 브랜드 명을 입력하세요</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand Name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
