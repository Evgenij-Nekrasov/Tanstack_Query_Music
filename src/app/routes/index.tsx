import { createFileRoute } from '@tanstack/react-router';
import { PlaylistPage } from '../pages/playlist-page';

export const Route = createFileRoute('/')({
  component: PlaylistPage,
});
