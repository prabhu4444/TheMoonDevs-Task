// hooks/useAuthSession.js
import { useSession } from 'next-auth/react';

const useAuthSession = () => {
  const { data: session, status } = useSession();

  return {
    isAuthenticated: status === 'authenticated',
    user: session?.user || null,
    status,
    accessToken: session?.accessToken || undefined,
    refreshToken: session?.refreshToken || undefined,
  };
};

export default useAuthSession;
