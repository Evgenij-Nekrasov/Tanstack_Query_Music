import { client } from '../../shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const Playlist = () => {
  const query = useQuery({
    queryKey: ['playlist'],
    queryFn: () => client.GET('/playlists'),
  });

  if (query.isPending) return <span>Loading...</span>;

  return (
    <div>
      <ul>
        {query.data?.data?.data.map((playlist) => (
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
