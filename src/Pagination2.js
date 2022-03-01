import React, { useEffect, useState } from "react";
import useSWRInfinite from 'swr/infinite';
import { urlList } from "./api";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const getKey = (pageIndex, previousPageData) => {
  const limit = 100;
  if (previousPageData && !previousPageData?.length) return null // reached the end
  return `${urlList}?limit=${limit}&offset=${pageIndex*limit}` // SWR key
}

function Pagination() {
  const [isReachingEnd, setReachingEnd] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    if (!isReachingEnd && data?.length) {
      const last = data[data.length - 1];

      if (!last.length) {
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
        {data?.map(array => array.map(({ id, username, email}) => (<li key={id}>
          <p>{`${username} - ${email}`}</p>
        </li>)))}
      </ul>
    </div>
  );
}

export default Pagination;

