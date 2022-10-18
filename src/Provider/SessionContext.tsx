import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { checkStorage, updateStorage } from "../utils/storage";
import { SessionContextT, providerProps, tokenT } from "./@types";

export const SessionContext = createContext<SessionContextT>(
  {} as SessionContextT
);

const SessionProvider = ({ children }: providerProps) => {
  const [data, setData] = useState<tokenT[]>([]);
  const [loading, setLoading] = useState(true);
  const timeOut = 1200;

  const requestDataTokens = async () => {
    try {
      setLoading(true);
      const response = await checkStorage();
      setData(response);
    } catch (error) {
      alert("Algo deu errado ao carregar a página");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, timeOut);
    }
  };

  const updateData = (value: tokenT) => {
    try {
      setLoading(true);
      const newArrayOfTokens = [...data, value];
      setData(newArrayOfTokens);
      updateStorage(newArrayOfTokens);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, timeOut);
    }
  };

  const removeToken = (id: string) => {
    try {
      setLoading(true);
      const newArrayOfTokens = data.filter((item) => item.id !== id);
      setData(newArrayOfTokens);
      updateStorage(newArrayOfTokens);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, timeOut);
    }
  };

  const updateToken = (value: tokenT) => {
    try {
      setLoading(true);
      const newArrayOfTokens = data.map((item) =>
        item.id === value.id ? value : item
      );
      setData(newArrayOfTokens);
      updateStorage(newArrayOfTokens);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, timeOut);
    }
  };

  const allNames = data.map((token) => token.name);

  useEffect(() => {
    requestDataTokens();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        data,
        setData,
        updateData,
        loading,
        setLoading,
        allNames,
        removeToken,
        updateToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
