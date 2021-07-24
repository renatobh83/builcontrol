import { useState } from "react";
import { getMonth, getYear } from "date-fns";
import {
  Button,
  Checkbox,
  Modal,
  Form,
  Label,
  Divider,
} from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { converteDate } from "../utils/filterDates";
import { useUser } from "@auth0/nextjs-auth0";

import CurrencyFormat from "react-currency-format";

import { decrypt } from "../utils/crypto";

interface IPropsValue {
  value: string;
}
interface IDataValues {
  user: any;
  recorrente: String;
  valor: String;
  mes: String;
  ano: String;
  data: Date;
  descr: string;
  parcelas: string;
  categoria: string;
  formaPagamento: string;
}
export default function FormCompra() {
  const {
    isActive,
    toggleActive,
    dataFetch,
    compratoFetch,
    edtiarCompra,
    setEditarCompra,
  } = useAppContext();

  const { user } = useUser();
  const [categoria, setCategoria] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valor, setValor] = useState("");
  const [descr, setDescr] = useState("");
  const [data, setData] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [recorrente, setRecorrente] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(e: any, { value }: IPropsValue) {
    setCategoria(value);
  }
  function handleFormaPagamento(e: any, { value }: IPropsValue) {
    setFormaPagamento(value);
    if (formaPagamento !== "credito") setParcelas("");
  }
  function handleDescricao(e: any, { value }: IPropsValue) {
    setDescr(value);
  }
  function handleValor(e: any) {
    setValor(e);
  }
  function handleData(e: any, { value }: IPropsValue) {
    setData(value);
  }
  function handleParcelas(e: any) {
    setParcelas(e);
  }
  const handleOnChange = (e: any, { value }: IPropsValue) => {
    setRecorrente(value);
  };
  function exitModal() {
    if (edtiarCompra) setEditarCompra("");
    setIsChecked(false);
    reset([
      setDescr,
      setCategoria,
      setValor,
      setData,
      setFormaPagamento,
      setParcelas,
      setRecorrente,
    ]);
    toggleActive();
  }

  async function handleSubmit() {
    if (categoria === "") return alert("Categoria não selecionada");

    const dataToSave: IDataValues = {
      user: user?.sub,
      recorrente,
      valor: valor.replace(",", "."),
      mes: getMonth(new Date(converteDate(data))).toString(),
      ano: getYear(new Date(converteDate(data))).toString(),
      data: converteDate(data),
      descr,
      parcelas,
      categoria,
      formaPagamento,
    };

    const insertResponse = await fetch("/api/compras/loadInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });
    const compraJson = await insertResponse.json();

    if (compraJson.data.length > 1) {
      compraJson.data.forEach((compra) => {
        compratoFetch.push(decrypt([compra])[0]);
      });
      dataFetch(compratoFetch);
    } else {
      compratoFetch.push(decrypt([compraJson.data])[0]);
    }

    dataFetch(compratoFetch);

    exitModal();
  }
  const options = [
    { key: "vista", value: "vista", text: "A vista" },
    { key: "credito", value: "credito", text: "Crédito" },
  ];

  return (
    <Modal
      onOpen={() => toggleActive()}
      open={isActive}
      dimmer="blurring"
      closeIcon
      onClose={() => exitModal()}
    >
      <Modal.Header>Adicionar compra</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Compra"
                label="Compra"
                value={descr || edtiarCompra.descr}
                onChange={handleDescricao}
                required
              />
              <div className="required field">
                <label>Valor</label>
                <div className="ui input">
                  <CurrencyFormat
                    placeholder="Valor"
                    required
                    allowNegative={false}
                    decimalSeparator=","
                    inputMode="decimal"
                    onChange={(e) => handleValor(e.target.value)}
                    type="text"
                    value={valor || edtiarCompra.valor}
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group widths={3}>
              <Form.Input
                type="date"
                label="Data vencimento "
                required
                value={data}
                onChange={handleData}
              />
              <Form.Select
                label="Forma pagamento"
                required
                value={formaPagamento || edtiarCompra.formaPagamento}
                onChange={handleFormaPagamento}
                options={options}
                placeholder="Forma pagamento"
              />
              {formaPagamento === "credito" && (
                <div className="required field">
                  <label>Parcelas</label>
                  <div className="ui input">
                    <CurrencyFormat
                      placeholder="Parcelas"
                      required
                      inputMode="numeric"
                      allowNegative={false}
                      value={parcelas}
                      onChange={(e) => handleParcelas(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  radio
                  label="Recorrente 6 meses"
                  name="recorrente"
                  checked={recorrente === "6"}
                  value="6"
                  onChange={handleOnChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label="Recorrente 12 meses"
                  name="recorrente"
                  value="12"
                  checked={recorrente === "12"}
                  onChange={handleOnChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label="Limpar"
                  name="recorrente"
                  checked={false}
                  onChange={handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            <Divider />
            <Form.Group>
              <Label content="Categoria" horizontal />
              <Form.Field>
                <Checkbox
                  radio
                  label="Casa"
                  name="categoria"
                  // defaultChecked={
                  //   edtiarCompra ? edtiarCompra.categoria : categoria
                  // }
                  value="Casa"
                  checked={categoria === "Casa"}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label="Pessoal"
                  name="categoria"
                  // defaultChecked={
                  //   edtiarCompra ? edtiarCompra.categoria : categoria
                  // }
                  value="Pessoal"
                  checked={categoria === "Pessoal"}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Divider />
            <Form.Group className="buttons_form">
              <Button color="red" onClick={exitModal}>
                Cancelar
              </Button>
              <Button
                content="Gravar"
                labelPosition="right"
                icon="checkmark"
                positive
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
export function reset([...opt]) {
  opt.forEach((set) => {
    set("");
  });
}
