import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { SchemaUpdatePlaylistRequestPayload } from '../../../../../shared/api/schema';
import { usePlaylistQuery } from '../api/use-playlist-query';
import { useUpdatePlaylistMutation } from '../api/use-update-playlist-mutation';

type Props = {
  playlistId: string;
  onCancelEditing: () => void;
};

export const EditPlaylistForm = ({ playlistId, onCancelEditing }: Props) => {
  const { handleSubmit, register, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  const { data, isPending, isError } = usePlaylistQuery(playlistId);

  useEffect(() => {
    reset();
  }, [playlistId, reset]);

  const { mutate } = useUpdatePlaylistMutation(playlistId);

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate(data, {
      onSuccess: () => {
        onCancelEditing();
      },
    });
  };

  const handleCancelEditingClick = () => {
    onCancelEditing();
  };

  if (!playlistId) return <></>;
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Playlist</h2>
      <p>
        <input
          defaultValue={data?.data?.attributes?.title}
          {...register('title')}
        />
      </p>
      <p>
        <textarea
          defaultValue={data.data.attributes.description!}
          {...register('description')}
        ></textarea>
      </p>
      <button type="submit">Save</button>
      <button type="reset" onClick={handleCancelEditingClick}>
        Cancel
      </button>
    </form>
  );
};
