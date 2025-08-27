import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '../../../../shared/api/client';
import { Pagination } from '../../../../shared/ui/pagination/Pagination';
import { DeletePlaylist } from '../../../features/playlists/ delete-playlist/ui/delete-playlist';

type Props = {
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
};

export const Playlist = ({ userId, onPlaylistSelected }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['playlist', { page, search, userId }],
    queryFn: async ({ signal }) => {
      const response = await client.GET('/playlists', {
        params: {
          query: {
            pageNumber: page,
            search,
            userId,
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

  const handlePlaylistSelected = (playlistId: string) => {
    onPlaylistSelected?.(playlistId);
  };

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
        {Array.isArray(query.data.data) ? (
          query.data.data.map((playlist) => (
            <li key={playlist.id}>
              <div onClick={() => handlePlaylistSelected(playlist.id)}>
                {playlist.attributes.title}
              </div>
              <DeletePlaylist playlistId={playlist.id} />
            </li>
          ))
        ) : (
          <li>No playlists found</li>
        )}
      </ul>
    </div>
  );
};
