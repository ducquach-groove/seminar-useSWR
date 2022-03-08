import React, { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import UserForm from "./UserForm";
import { urlList } from "./api";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getKey = (pageIndex, previousPageData) => {
  const limit = 100;
  if (previousPageData && !previousPageData?.length) return null; // reached the end
  return `${urlList}?limit=${limit}&offset=${pageIndex * limit}`; // SWR key
};

function Pagination() {
  const [lastSelected, setLastSelected] = useState(null);
  const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setLastSelected(null);
    };

  const [isReachingEnd, setReachingEnd] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const onSelectUser = useCallback(id => {
    setLastSelected(id);
    handleOpen();
  }, []);

  useEffect(() => {
    if (!isReachingEnd && data?.length) {
      const last = data[data.length - 1];

      if (!last.length) {
        setReachingEnd(true);
      }
    }
  }, [data, isReachingEnd]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box minWidth={460}>
      <Paper elevation={1}>
        <Button
          sx={{
            position: "sticky",
            zIndex: 1,
            top: 12,
            m: "12px",
            width: "calc(100% - 24px)"
          }}
          variant="contained"
          disabled={isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          Load More
        </Button>
        <List dense>
          {data?.map(array =>
            array.map(({ id, name, username, email }) => (
              <ListItem key={`${name}-${id}`} onClick={() => onSelectUser(id)}>
                <ListItemAvatar>
                  <Avatar>{name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={username} />
              </ListItem>
            ))
          )}
        </List>
        <UserForm id={lastSelected} open={open} onClose={handleClose} />
      </Paper>
    </Box>
  );
}

export default Pagination;
