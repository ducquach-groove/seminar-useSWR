import React, { useState, useCallback } from "react";
import useSWR from 'swr';
import Box from '@mui/material/Box';
import URL from "./api";
import EditForm from "./EditForm";
import User from "./User";

const fetcher = (...args) => fetch(...args).then(res => {
  return res.json();
});
const fetcherWithParams = (...args) => {
  const [url, paramId] = args;

  return fetch(`${url}/${paramId}`).then(res => {
    return res.json();
  });
}
const fetcherAsPATCH = id => async data => {
  const fullURL = `${URL}/${id}`;
  return await fetch(fullURL, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
};

function Mutation() {
  const id = "5ca4bbcea2dd94ee58162a68";
  const fullURL = `${URL}/${id}`;
  const { data, error, mutate } = useSWR(fullURL, fetcher);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onMutateManuallyHandler = useCallback(async formValue => {
    const newData = {
      ...data,
      username: formValue
    };
    // update the local data immediately, but disable the revalidation
    mutate(newData, false);
    // send a request to the API to update the source
    await fetcherAsPATCH(id)({ username: `${formValue}` });
    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate();

    handleClose();
  }, [data, mutate]);

  const onMutateAutoHandler = useCallback(async formValue => {
    mutate(async currValue => {
      const newData = {
        ...currValue,
        username: `${formValue}`
      };
      await fetcherAsPATCH(id)({ username: formValue });
      return newData;
    });
    handleClose();
  }, [mutate]);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Box>
      <User data={data} onEdit={handleOpen} />
      <EditForm
        value={data.username}
        open={open}
        onMutateAuto={onMutateAutoHandler}
        onMutateManual={onMutateManuallyHandler}
        onClose={handleClose}
      />
    </Box>
  );
}

export default Mutation;

