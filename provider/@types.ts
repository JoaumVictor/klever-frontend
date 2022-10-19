import { ReactNode } from "react";

export type providerProps = {
  children: ReactNode | ReactNode[];
};

export type tokenT = {
  id?: string;
  name: string;
  balance: number;
};

export type SessionContextT = {
  data: tokenT[];
  setData: (data: tokenT[]) => void;
  updateData: (data: tokenT) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  allNames: string[];
  removeToken: (id: string) => void;
  updateToken: (value: tokenT) => void;
};
