import { Link } from '@tanstack/react-router';
import styles from './header.module.css';
import type { ReactNode } from 'react';

type Props = {
  renderAccountBar: () => ReactNode;
};

export const Header = ({ renderAccountBar }: Props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.linksBlock}>
        <Link to="/">Playlists</Link>
        <Link to="/my-playlists">My Playlists</Link>
        <Link to="/oauth/callback">temp page</Link>
      </nav>

      <div>{renderAccountBar()}</div>
    </header>
  );
};
