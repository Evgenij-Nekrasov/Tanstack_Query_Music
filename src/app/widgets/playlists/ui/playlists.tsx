import { useState } from 'react';

import { Pagination } from '../../../../shared/ui/pagination/Pagination';
import { DeletePlaylist } from '../../../features/playlists/ delete-playlist/ui/delete-playlist';
import { usePlaylistsQuery } from '../api/use-playlists-query';

type Props = {
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
  isSearchActive?: boolean;
};

export const Playlist = ({
  userId,
  onPlaylistSelected,
  isSearchActive,
}: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { query } = usePlaylistsQuery({
    userId,
    filters: { search, pageNumber: page },
  });

  const handlePlaylistSelected = (playlistId: string) => {
    onPlaylistSelected?.(playlistId);
  };

  if (query.isPending) return <span>Loading...</span>;
  if (query.isError) return <span>{JSON.stringify(query.error)}</span>;

  return (
    <div>
      {isSearchActive && (
        <div>
          <input
            type="text"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            placeholder="search..."
          />
        </div>
      )}
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
