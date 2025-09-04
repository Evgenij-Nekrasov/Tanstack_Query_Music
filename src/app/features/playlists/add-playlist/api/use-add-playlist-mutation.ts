import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SchemaCreatePlaylistRequestPayload } from '../../../../../shared/api/schema';
import { client } from '../../../../../shared/api/client';
import { playlistKeys } from '../../../../../shared/api/keys-factories/playlist-keys-factories';

export const useAddPlaylistMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
      const response = await client.POST('/playlists', {
        body: data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playlistKeys.lists(),
      });
    },
  });

  return { mutate };
};
