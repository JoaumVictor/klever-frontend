// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

type tokensT = {
  id: string;
  name: string;
  balance: number;
};

const tokensDefault = [
  { id: uuidv4(), name: "BTC", balance: 102308.12 },
  { id: uuidv4(), name: "ETH", balance: 6902.66 },
  { id: uuidv4(), name: "BNB", balance: 1435.11 },
  { id: uuidv4(), name: "USDT", balance: 5.28 },
  { id: uuidv4(), name: "DOGE", balance: 0.31 },
];

export default function tokens(
  req: NextApiRequest,
  res: NextApiResponse<tokensT[]>
) {
  res.status(200).json(tokensDefault);
}
