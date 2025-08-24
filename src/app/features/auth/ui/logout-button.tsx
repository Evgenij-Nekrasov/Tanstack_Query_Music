import { useLogoutMutation } from '../api/use-logout-mutation';

export const LogoutButton = () => {
  const queryClient = useLogoutMutation();

  const handleLogoutClick = () => {
    queryClient.mutate();
  };

  return <button onClick={handleLogoutClick}>Logout</button>;
};
