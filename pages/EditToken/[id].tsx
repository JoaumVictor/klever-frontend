import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { SessionContext } from "../../src/Provider/SessionContext";
import S from "./style.module.scss";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

import Header from "../../components/Header";
import BarOptions from "../../components/BarOptions";
import DeleteModal from "../../components/DeleteModal";
import { tokenT } from "../../src/Provider/@types";
import Head from "next/head";

const EditToken: NextPage = () => {
  const { data, removeToken, updateToken, allNames } =
    useContext(SessionContext);
  const router = useRouter();
  const { id } = router.query;
  const [tokenToEdit, setTokenToEdit] = useState<tokenT>(null!);
  const [tokenInfo, setTokenInfo] = useState(false);
  const [modalEnable, setModalEnable] = useState(false);

  useEffect(() => {
    if (data) {
      const token = data.find((item) => item.id === id);
      if (token) {
        setTokenToEdit(token);
        form.setFieldValue("Token", token.name);
        form.setFieldValue("Balance", token.balance);
      }
    }
  }, [id, data]);

  const handleRemoveToken = () => {
    removeToken(id as string);
    router.push("/");
  };

  const handleUpdateToken = () => {
    updateToken({
      id: tokenToEdit.id,
      name: form.values.Token,
      balance: Number(form.values.Balance),
    });
    router.push("/");
  };

  const form = useFormik({
    initialValues: {
      Token: "",
      Balance: "",
    },
    validationSchema: yup.object({
      Token: yup
        .string()
        .test("is-unique", "Esse token já existe", (value) => {
          if (tokenToEdit) {
            const validNames = allNames.filter(
              (item) => item !== tokenToEdit.name
            );
            return !validNames.some(
              (each) => each.toLowerCase() === value?.toLowerCase()
            );
          }
          return !allNames.some(
            (each) => each.toLowerCase() === value?.toLowerCase()
          );
        })
        .min(3, "Mínimo de 3 caracteres")
        .max(5, "Máximo de 5 caracteres")
        .required("O nome do Token é obrigatório"),
      Balance: yup
        .number()
        .typeError("Digite apenas valores numéricos")
        .required("O campo de Balanço é obrigatório"),
    }),
    onSubmit: () => handleUpdateToken(),
  });

  return (
    <>
      {modalEnable && (
        <DeleteModal
          cancel={() => setModalEnable(false)}
          func={handleRemoveToken}
        />
      )}
      <div className={S.container}>
        <Head>
          <title>Klever</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/kleverIcon.ico" />
        </Head>
        <Header />
        <BarOptions config={{ buttonEnable: true }} />
        <div className={S.boxWithTitleAndButtonBack}>
          <h2>Edit Token</h2>
          <Link href={"/"}>
            <button>Voltar</button>
          </Link>
        </div>
        <form className={S.formEditToken} onSubmit={form.handleSubmit}>
          <label htmlFor="Token">
            <p>Token</p>
            <input
              className={S.inputs}
              type="text"
              id="Token"
              name="Token"
              defaultValue={form.values.Token}
              onClick={() => setTokenInfo(true)}
              value={form.values.Token}
            />
            {tokenInfo && (
              <p className={S.message}>O nome do token não pode ser alterado</p>
            )}
          </label>
          <label htmlFor="email">
            <p>Balance</p>
            <input
              className={S.inputs}
              id="Balance"
              name="Balance"
              type="numeric"
              onChange={form.handleChange}
              value={form.values.Balance}
            />
            {form.errors.Balance && (
              <p className={S.error}>{form.errors.Balance}</p>
            )}
          </label>
          <div className={S.boxSubmit}>
            <button
              type="button"
              onClick={() => setModalEnable(true)}
              className={S.remove}
            >
              Deletar
            </button>
            <button className={S.submit} type="submit">
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditToken;
