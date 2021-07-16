import { useState } from "react";
import { getMonth, getYear } from "date-fns";
import { Button, Checkbox, Modal, Form, Label } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { converteDate, stringToDate } from "../utils/filterDates";
import { useUser } from "@auth0/nextjs-auth0";

interface IPropsValue {
  value: string;
}
interface IDataValues {
  user: any;
  recorrente: boolean;
  valor: string;
  mes: String;
  ano: String;
  data: Date;
  descr: string;
  parcelas: string;
  categoria: string;
  formaPagamento: string;
}
export default function FormCadastro() {
  const { isActive, toggleActive } = useAppContext();
  const { user } = useUser();
  const [categoria, setCategoria] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valor, setValor] = useState(" ");
  const [descr, setDescr] = useState(" ");
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
    // console.log(value);
  }
  function handleValor(e: any, { value }: IPropsValue) {
    setValor(value);
  }
  function handleData(e: any, { value }: IPropsValue) {
    setData(value);
  }
  function handleParcelas(e: any, { value }: IPropsValue) {
    setParcelas(value);
  }
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  function exitModal() {
    setCategoria("");
    toggleActive();
  }
  async function onSubmit() {
    const dataToSave: IDataValues = {
      user: user.sub,
      recorrente: isChecked,
      valor,
      mes: getMonth(new Date(converteDate(data))).toString(),
      ano: getYear(new Date(converteDate(data))).toString(),
      data: converteDate(data),
      descr,
      parcelas,
      categoria,
      formaPagamento,
    };
    console.log(converteDate(data));
    fetch("/api/compras/loadInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    }).then(() => toggleActive());
  }
  const options = [
    { key: "vista", value: "vista", text: "A vista" },
    { key: "credito", value: "credito", text: "Credito" },
    // { key: "debito", value: "debito", text: "Debito" },
  ];
  return (
    <Modal onOpen={() => toggleActive()} open={isActive}>
      <Modal.Header>Adicionar compra</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Compra"
                label="Compra"
                value={descr}
                onChange={handleDescricao}
                required
              />
              <Form.Input
                placeholder="Valor"
                label="Valor"
                value={valor}
                onChange={handleValor}
                required
              />
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
                <Form.Input
                  label="Parcelas"
                  required
                  value={parcelas}
                  onChange={handleParcelas}
                />
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
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color="red" onClick={exitModal}>
          Cancelar
        </Button>
        <Button
          content="Gravar"
          labelPosition="right"
          icon="checkmark"
          onClick={onSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
