import { useState } from "react";
import axios from "axios";
import { Form } from "../form/Form";
import "./Cadastro.css";

export const CadastroUnidade = () => {
  const [error, setError] = useState(false);

  const unidadeFields = [
    {
      type: "text",
      label: "Apelido",
      name: "apelido",
      placeholder: "Painel 1",
      style: { width: "282px" },
    },
    {
      type: "text",
      label: "Local",
      name: "local",
      placeholder: "Rua Alberto 430",
    },
    {
      type: "text",
      label: "Marca",
      name: "marca",
      placeholder: "marca",
    },
    {
      type: "text",
      label: "Modelo",
      name: "modelo",
      placeholder: "155w",
    },
    { type: "checkbox", label: "Ativa", name: "ativa", placeholder: "check" },
  ];
  const ENDPOINT_UNIDADES = "http://localhost:3000/unidades";

  const validarInputs = (formData) => {
    const { apelido, local, marca, modelo } = formData;
    if (!apelido || !local || !marca || !modelo) {
      alert("Preencha todos os campos");
      return false;
    }
    return true;
  };

  const postNovaUnidade = async (novaUnidade) => {
    try {
      const updatedResponse = await axios.post(ENDPOINT_UNIDADES, novaUnidade);
      if (updatedResponse.status === 201) {
        console.log("Unidade cadastrada com sucesso");
        setError(false);
      } else {
        console.log("Erro ao cadastrar unidade");
        setError(true);
      }
    } catch (error) {
      console.error(`Error: ${error.msg}`);
      setError(true);
    }
  };

  const handleUnidadeSubmit = async (formData) => {
    validarInputs(formData) && (await postNovaUnidade(formData));
  };

  return (
    <div>
      <h1 className="">Unidades</h1>
      {error && <p>Erro ao realizar lançamento.</p>}
      <h2>Cadastro de Unidade Geradora</h2>
      <Form
        fields={unidadeFields}
        onSubmit={handleUnidadeSubmit}
        submitButtonLabel="Salvar"
      />
    </div>
  );
};
