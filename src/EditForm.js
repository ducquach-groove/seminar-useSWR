import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ value: valueProps, open, onClose, onMutateManual, onMutateAuto }) {
  const [value, setValue] = useState(valueProps ?? "");

  useEffect(() => {
    if (value !== valueProps)
      setValue(valueProps);
  }, [valueProps]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={value}
          onChange={e => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={() => onMutateManual(value)}>Mutate Manual</Button>
        <Button onClick={() => onMutateAuto(value)}>Mutate Auto</Button>
      </DialogActions>
    </Dialog>
  );
}