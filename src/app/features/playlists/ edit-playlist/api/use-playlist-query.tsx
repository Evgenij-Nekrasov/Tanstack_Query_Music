import { useQuery } from '@tanstack/react-query';

import { client } from '../../../../../shared/api/client';

export const usePlaylistQuery = (playlistId: string) => {
  return useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: async () => {
      const response = await client.GET('/playlists/{playlistId}', {
        params: { path: { playlistId } },
      });
      return response.data!;
    },
    enabled: !!playlistId,
  });
};
