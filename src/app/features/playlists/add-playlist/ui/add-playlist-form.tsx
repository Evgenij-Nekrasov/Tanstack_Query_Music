import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { client } from '../../../../../shared/api/client';
import type { SchemaCreatePlaylistRequestPayload } from '../../../../../shared/api/schema';

export const AddPlaylistForm = () => {
  const { handleSubmit, register } =
    useForm<SchemaCreatePlaylistRequestPayload>();

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
        queryKey: ['playlist'],
      });
    },
  });

  const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Playlist</h2>
      <p>
        <input {...register('title')} />
      </p>
      <p>
        <textarea {...register('description')}></textarea>
      </p>
      <button type="submit">Create</button>
    </form>
  );
};
