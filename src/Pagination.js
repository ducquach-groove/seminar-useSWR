import React, { useEffect, useState } from "react";
import useSWRInfinite from 'swr/infinite';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const getKey = (pageIndex, previousPageData) => {
  const limit = 500;
  if (previousPageData && !previousPageData?.results.length) return null // reached the end
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageIndex*limit}` // SWR key
}

function Pagination() {
  const [isReachingEnd, setReachingEnd] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    if (!isReachingEnd && data?.length) {
      const last = data[data.length - 1];

      if (!last.next) {
        setReachingEnd(true);
      }
    }
  }, [data, isReachingEnd]);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="App">
      <button disabled={isReachingEnd} onClick={() => setSize(size + 1)}>Load More</button>
      <ul>
        {data?.map(({ results }) => results.map((item, index) => (<li key={index}>
          <p>{item.name}</p>
        </li>)))}
      </ul>
    </div>
  );
}

export default Pagination;

