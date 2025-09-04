import type { SchemaGetPlaylistsRequestPayload } from '../schema';

export const playlistKeys = {
  all: ['playlists'],
  lists: () => [...playlistKeys.all, 'lists'],
  myLists: () => [...playlistKeys.lists(), 'my'],
  list: (filters: Partial<SchemaGetPlaylistsRequestPayload>) => [
    ...playlistKeys.lists(),
    filters,
  ],
  details: () => [...playlistKeys.all, 'details'],
  detail: (id: string) => [...playlistKeys.details(), id],
};
