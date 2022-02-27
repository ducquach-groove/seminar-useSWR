import React from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Pagination() {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/photos', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="App">
      <ul>
        {data.map((item, index) => (<li key={index}>
          <p>{item.title}</p>
          <img alt={item.title} src={item.thumbnailUrl} />
        </li>))}
      </ul>
    </div>
  );
}

export default Pagination;

