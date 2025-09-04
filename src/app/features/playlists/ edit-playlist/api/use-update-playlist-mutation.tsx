import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SchemaUpdatePlaylistRequestPayload } from '../../../../../shared/api/schema';
import { client } from '../../../../../shared/api/client';

export const useUpdatePlaylistMutation = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
      const response = await client.PUT('/playlists/{playlistId}', {
        params: {
          path: { playlistId },
        },
        body: { ...data, tagIds: [] },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlists', 'lists', 'my'],
      });
    },
  });
};
