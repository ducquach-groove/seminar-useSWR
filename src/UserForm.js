import React from 'react';
import Button from '@mui/material/Button';
import useSWR from "swr";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import User from "./User";
import URL from "./api";

const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function UserForm({ open, onClose, id = undefined }) {
  const { data, error } = useSWR(id && `${URL}/${id}`, fetcher, {
    dedupingInterval: 1000*60
  });

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <User data={data} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}