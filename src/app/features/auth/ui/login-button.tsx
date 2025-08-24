import { useLoginMutation } from '../api/use-login-mutation';
import { callbackUrl } from '../api/use-login-mutation';

export const LoginButton = () => {
  const queryClient = useLoginMutation();

  const handleLoginClick = () => {
    window.addEventListener('message', handleOAuthMessage);
    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
      'apihub-oauth2',
      'width=500, heigth=600'
    );
  };

  const handleOAuthMessage = (e: MessageEvent) => {
    window.removeEventListener('message', handleOAuthMessage);
    if (e.origin !== document.location.origin) {
      console.warn('origin not match');
      return;
    }
    const code = e.data.code;
    if (!code) {
      console.warn('origin not match');
      return;
    }

    queryClient.mutate({ code });
  };

  return <button onClick={handleLoginClick}>Login with APIHUB</button>;
};
