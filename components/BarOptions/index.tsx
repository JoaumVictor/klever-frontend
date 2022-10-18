import Image from "next/image";
import Link from "next/link";
import React from "react";
import S from "./style.module.scss";

import { star } from "../../assets";

type ConfigProps = {
  buttonEnable: boolean;
};

interface BarOptionsProps {
  config: ConfigProps;
}

export default function BarOptions({ config }: BarOptionsProps) {
  const trueButtonStyle = `${S.barOptions} ${S.trueButtonStyle}`;
  const falseButtonStyle = `${S.barOptions} ${S.falseButtonStyle}`;

  return (
    <section
      className={config.buttonEnable ? trueButtonStyle : falseButtonStyle}
    >
      <div className={S.boxStarIcon}>
        <Image
          className={S.iconStar}
          src={star}
          alt="Estrela"
          height={50}
          width={50}
        />
        <p>Wish Wallet</p>
      </div>
      {config.buttonEnable && (
        <Link href="/AddToken">
          <button className={S.buttonAddToken}>Add Token</button>
        </Link>
      )}
    </section>
  );
}
