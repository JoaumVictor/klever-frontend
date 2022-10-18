import React from "react";
import S from "./style.module.scss";

export default function DeleteModal({ func, cancel }: any) {
  return (
    <div className={S.container}>
      <div className={S.box}>
        <p>Tem certeza?</p>
        <section className={S.options}>
          <button className={S.cancel} onClick={() => cancel()}>
            Cancelar
          </button>
          <button className={S.remove} onClick={() => func()}>
            Deletar
          </button>
        </section>
      </div>
    </div>
  );
}
