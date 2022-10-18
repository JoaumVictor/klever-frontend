import { tokenT } from "../Provider/@types";
import { requestTokensDefault } from "../services/api";

const checkStorage = async (): Promise<tokenT[]> => {
  const storage = localStorage.getItem("@klever:token");
  if (storage === null) return await requestTokensDefault();
  const arrayTokens = JSON.parse(storage);
  return arrayTokens;
};

const updateStorage = (data: tokenT[]) => {
  localStorage.setItem("@klever:token", JSON.stringify(data));
};

export { checkStorage, updateStorage };
