import React, { useState } from "react";
import useSWR, { useSWRConfig } from 'swr';
import URL from "./api";

const fetcherWithMongo = (...args) => fetch(...args).then(res => {
  return res.json();
}).then(body => body);
const fetcherWithParams = (...args) => {
  const [url, paramId] = args;

  return fetch(`${url}/${paramId}`).then(res => {
    return res.json();
  }).then(body => body);
}

function List() {
  const id = "5ca4bbcea2dd94ee58162a68";
  const fullURL = `${URL}/${id}`;
  const [value, setValue] = useState("");
  const fetcherAsPATCH = async (id, data) => {
    return await fetch(fullURL, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
  };
  const { data, error, mutate } = useSWR([URL, id], fetcherWithParams);
  // const { data, error, mutate } = useSWR(fullURL, fetcherWithMongo);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="App">
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={async () => {
        const newData = {
          ...data,
          username: value
        };
        // update the local data immediately, but disable the revalidation
        mutate(newData, false);
        // send a request to the API to update the source
        await fetcherAsPATCH(id, { username: value });
        // trigger a revalidation (refetch) to make sure our local data is correct
        mutate()
      }}>Mutate Manually</button>

      <button onClick={() => {
        mutate(async curr => {
          const newData = {
            ...curr,
            title: value
          };
          await fetcherAsPATCH(id, { username: value });
          return newData;
        });
      }}>Mutate Auto</button>

      <p>{data.username}</p>
      <p>{data.email}</p>
    </div>
  );
}

export default List;

