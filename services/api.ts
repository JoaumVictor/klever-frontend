import axios from "axios";

type tokensT = {
  id: string;
  name: string;
  balance: number;
};

interface axiosI {
  data: tokensT[];
}

const requestTokensDefault = async () => {
  const { data }: axiosI = await axios.get("/api/tokens");
  return data;
};

export { requestTokensDefault };
