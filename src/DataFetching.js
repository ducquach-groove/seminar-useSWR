import React from "react";
import useSWR from "swr";
import isEmpty from "lodash/isEmpty";
import URL from "./api";
import User from "./User";

const fetcher = (...args) => fetch(...args).then(res => res.json());

function DataFetching() {
  const wrongId = "507f1f77bcf86cd799439011";
  const id = "5ca4bbcea2dd94ee58162a68";
  const { data, error } = useSWR(`${URL}/${id}`, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (isEmpty(data)) {
    return <div>Not existing</div>
  }

  return (
    <User data={data} />
  );
}

export default DataFetching;

