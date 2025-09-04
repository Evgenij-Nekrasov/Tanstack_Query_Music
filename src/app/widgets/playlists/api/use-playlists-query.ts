import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { client } from '../../../../shared/api/client';
import { playlistKeys } from '../../../../shared/api/keys-factories/playlist-keys-factories';
import type { SchemaGetPlaylistsRequestPayload } from '../../../../shared/api/schema';

interface Props {
  userId?: string;
  filters: Partial<SchemaGetPlaylistsRequestPayload>;
}

export const usePlaylistsQuery = ({ userId, filters }: Props) => {
  const key = userId ? playlistKeys.myLists() : playlistKeys.list(filters);

  const queryParams = userId
    ? {
        userId,
      }
    : filters;

  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: key,
    queryFn: async ({ signal }) => {
      const response = await client.GET('/playlists', {
        params: {
          query: queryParams,
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

  return { query };
};
