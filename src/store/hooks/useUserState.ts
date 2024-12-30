import { useAtom } from 'jotai';
import { userAtom, isLoadingAtom,UserState } from '@/store/atoms/user';

export function useUserState() {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const updateUser = (userData: UserState) => {
    setIsLoading(true);
    try {
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    updateUser,
  };
}