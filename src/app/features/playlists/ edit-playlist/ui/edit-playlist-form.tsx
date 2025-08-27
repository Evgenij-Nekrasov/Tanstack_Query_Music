import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { client } from '../../../../../shared/api/client';
import type { SchemaUpdatePlaylistRequestPayload } from '../../../../../shared/api/schema';
import { useEffect } from 'react';

type Props = {
  playlistId: string | string;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { handleSubmit, register, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  const { data, isPending, isError } = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: async () => {
      const response = await client.GET('/playlists/{playlistId}', {
        params: { path: { playlistId } },
      });
      return response.data!;
    },
    enabled: !!playlistId,
  });

  useEffect(() => {
    reset();
  }, [playlistId, reset]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
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
        queryKey: ['playlist'],
      });
    },
  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate(data);
  };

  if (!playlistId) return <></>;
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Playlist</h2>
      <p>
        <input
          defaultValue={data?.data.attributes.title}
          {...register('title')}
        />
      </p>
      <p>
        <textarea
          defaultValue={data?.data.attributes.description!}
          {...register('description')}
        ></textarea>
      </p>
      <button type="submit">Save</button>
    </form>
  );
};
