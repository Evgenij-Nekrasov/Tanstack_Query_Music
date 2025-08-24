import { useQuery } from '@tanstack/react-query';
import { client } from '../../../../shared/api/client';

export const useMeQuery = () => {
  const query = useQuery({
    queryKey: ['auth', 'me'],
    retry: false,
    queryFn: async () => {
      const clientResponse = await client.GET('/auth/me');
      return clientResponse.data;
    },
  });

  return query;
};
