import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AUTH_API from "../../api/AuthAPI";

export default function CertifyDialog(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("2020-06-28");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    await AUTH_API.certifyAdult({
      name: name,
      birth: birth,
      user_id: window.sessionStorage.getItem("user_id"),
    })
      .then((result) => {
        console.log(result);
        if (result.data.result === "accept") {
          handleClose();
          setName("");
          alert("성인인증이 완료되었습니다");
          window.location.reload(true);
        } else {
          alert("미성년자는 해당 서비스를 이용하실 수 없습니다!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<VerifiedUserIcon />}
        style={{ marginTop: 20 }}
        onClick={handleClickOpen}
      >
        Adult Certification
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adult Certification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Goorm 서비스는 만 19세 이상만 이용이 가능합니다. 생년월일과 이름을
            입력해주세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Certify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
