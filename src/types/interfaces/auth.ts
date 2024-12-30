export interface AuthProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export interface User {
  id: string;
  uid: string;  
  email?: string;
  name?: string;
  image?: string;
}
