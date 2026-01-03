import { useState } from "react";

export type User = {
  id: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password?: string): Promise<User> => {
    const fakeUser: User = { id: "1", email };
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => setUser(null);

  return { user, login, logout };
}
