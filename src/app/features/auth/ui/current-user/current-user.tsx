import { Link } from '@tanstack/react-router';
import { useMeQuery } from '../../api/use-me';

import styles from './current-user.module.css';
import { LogoutButton } from '../logout-button';

const CurrentUser = () => {
  const query = useMeQuery();

  if (!query.data) return <span>...</span>;

  return (
    <div className={styles.meInfoContainer}>
      <Link to="/my-playlists" activeOptions={{ exact: true }}>
        {query.data?.login} <LogoutButton />
      </Link>
    </div>
  );
};

export default CurrentUser;
