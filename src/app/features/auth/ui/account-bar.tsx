import { LoginButton } from './login-button';
import CurrentUser from './current-user/current-user';
import { useMeQuery } from '../api/use-me';

export const AccountBar = () => {
  const query = useMeQuery();

  if (query.isPending) return <span></span>;

  return (
    <div>
      {!query.data && <LoginButton />}
      {query.data && <CurrentUser />}
    </div>
  );
};
