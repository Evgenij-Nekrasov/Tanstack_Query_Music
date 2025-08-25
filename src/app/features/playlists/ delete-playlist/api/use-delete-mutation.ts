import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../../../shared/api/client';
import type { SchemaGetPlaylistOutput } from '../../../../../shared/api/schema';

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await client.DELETE('/playlists/{playlistId}', {
        params: {
          path: { playlistId },
        },
      });
      return response.data;
    },
    onSuccess: (_, playlistId) => {
      queryClient.setQueriesData(
        { queryKey: ['playlist'] },
        (oldData: SchemaGetPlaylistOutput) => {
          return {
            ...oldData,
            data: oldData.data.id !== playlistId,
          };
        }
      );
    },
  });
};
