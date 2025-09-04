import { useQuery } from '@tanstack/react-query';
import { client } from '../../../../shared/api/client';
import { authKeys } from '../../../../shared/api/keys-factories/auth-keys-factories';

export const useMeQuery = () =>
  useQuery({
    queryKey: authKeys.me(),
    retry: false,
    queryFn: async () => {
      const clientResponse = await client.GET('/auth/me');
      return clientResponse.data;
    },
  });
