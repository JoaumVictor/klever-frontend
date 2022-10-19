import React from "react";
import { tokenT } from "../../provider/@types";
import S from "./style.module.scss";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";

interface CardCryptoProps {
  token: tokenT;
}

export default function CardCryto({ token }: CardCryptoProps) {
  return (
    <div className={S.container}>
      <Link href={`/EditToken/${token.id}`}>
        <button>
          <BiEditAlt className={S.icon} />
        </button>
      </Link>
      <section className={S.description}>
        <p>{token.name}</p>
        <p>{token.balance}</p>
      </section>
    </div>
  );
}
