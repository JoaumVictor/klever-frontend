import React from "react";
import Image from "next/image";
import { kleverLogo } from "../../assets";
import Link from "next/link";
import S from "./style.module.scss";

export default function Header() {
  return (
    <header>
      <Link href={"/"}>
        <Image
          className={S.logo}
          src={kleverLogo}
          alt="Logotipo da Klever"
          height={180}
          width={200}
        />
      </Link>
    </header>
  );
}
