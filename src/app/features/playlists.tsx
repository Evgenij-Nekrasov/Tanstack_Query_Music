import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '../../shared/api/client';
import { Pagination } from '../../shared/ui/pagination/pagination';

export const Playlist = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['playlist', page, search],
    queryFn: async ({ signal }) => {
      const response = await client.GET('/playlists', {
        params: {
          query: {
            pageNumber: page,
            search,
          },
        },
        signal,
      });
      if (response.error) {
        throw (response as { error: Error }).error;
      }
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  if (query.isPending) return <span>Loading...</span>;
  if (query.isError) return <span>{JSON.stringify(query.error)}</span>;

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          placeholder="search..."
        />
      </div>
      <Pagination
        pagesCount={query.data.meta.pagesCount}
        current={page}
        onChangePageNumber={setPage}
        isFetching={query.isFetching}
      />
      <ul>
        {query.data.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
