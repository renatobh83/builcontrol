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

interface IPropsValue {
  value: string;
}
interface IDataValues {
  user: any;
  recorrente: boolean;
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
  const { isActive, toggleActive } = useAppContext();
  const { user } = useUser();
  const [categoria, setCategoria] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valor, setValor] = useState("");
  const [descr, setDescr] = useState("");
  const [data, setData] = useState("");
  const [parcelas, setParcelas] = useState("");
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
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  function exitModal() {
    setIsChecked(false);
    toggleActive();
    reset([
      setDescr,
      setCategoria,
      setValor,
      setData,
      setFormaPagamento,
      setParcelas,
    ]);
  }
  async function handleSubmit() {
    if (categoria === "") return alert("Categoria não selecionada");

    const dataToSave: IDataValues = {
      user: user.sub,
      recorrente: isChecked,
      valor: valor.replace(",", "."),
      mes: getMonth(new Date(converteDate(data))).toString(),
      ano: getYear(new Date(converteDate(data))).toString(),
      data: converteDate(data),
      descr,
      parcelas,
      categoria,
      formaPagamento,
    };

    fetch("/api/compras/loadInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    }).then((res) => {
      if (res.status === 200) {
        reset([
          setDescr,
          setCategoria,
          setValor,
          setData,
          setFormaPagamento,
          setParcelas,
        ]);
        setIsChecked(false);
        toggleActive();
        return alert("Compra cadastrada com sucesso");
      }
    });
  }
  const options = [
    { key: "vista", value: "vista", text: "A vista" },
    { key: "credito", value: "credito", text: "Crédito" },
  ];
  return (
    <Modal
      onOpen={() => toggleActive()}
      open={isActive}
      closeIcon
      onClose={() => toggleActive()}
    >
      <Modal.Header>Adicionar compra</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Compra"
                label="Compra"
                value={descr}
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
                    value={valor}
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group widths={3}>
              <Form.Input
                type="date"
                label="Data compra"
                required
                value={data}
                onChange={handleData}
              />
              <Form.Select
                label="Forma pagamento"
                required
                value={formaPagamento}
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
            <Form.Field>
              <Checkbox
                label="Recorrente"
                name="recor"
                value="true"
                checked={isChecked}
                onChange={handleOnChange}
              />
            </Form.Field>
            <Form.Group>
              <Label content="Categoria" horizontal />
              <Form.Field>
                <Checkbox
                  radio
                  label="Casa"
                  name="categoria"
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
