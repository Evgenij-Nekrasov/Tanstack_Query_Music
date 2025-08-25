import { Navigate } from '@tanstack/react-router';

import { Playlist } from '../widgets/playlists/ui/playlists';
import { useMeQuery } from '../features/auth/api/use-me';
import { AddPlaylistForm } from '../features/playlists/add-playlist/ui/add-playlist-form';

export function MyPlaylistPage() {
  const { data, isPending } = useMeQuery();

  if (isPending) return <div>Loading...</div>;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>My Playlist</h2>
      <hr />
      <AddPlaylistForm />
      <hr />
      <Playlist userId={data.userId} />
    </div>
  );
}
