import { Modal, Form, List, Grid, Button } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import CurrencyFormat from "react-currency-format";
import { getMonth, getYear } from "date-fns";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { converteDate } from "../utils/filterDates";
import { reset } from "./FormCompra";
import { decrypt } from "../utils/crypto";
import { v4 as uuid } from "uuid";
interface IPropsValue {
  value: string;
}
export default function FormReceita() {
  const {
    isActiveModalReceita,
    toggleReceita,
    receitas,
    receitaToForm,
    setReceitaToForm,
    addReceitaFetch,
  } = useAppContext();
  const { user } = useUser();
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");

  function handleData(e: any, { value }: IPropsValue) {
    setData(value);
  }

  async function handleDeleteReceita(e: any, { value }: IPropsValue) {
    const response = await fetch(`/api/receitas/receita?id=${value.id}`, {
      method: "DELETE",
    });
    await response.json();

    const newReceita = receitas.filter((id) => id.id !== value.id);
    addReceitaFetch(newReceita);
    setReceitaToForm(newReceita);
    toggleReceita();
  }

  console.log(receitaToForm);
  async function handleSubmit() {
    const dataToSave = {
      user: user?.sub,
      valor: valor.replace(",", "."),
      mes: getMonth(new Date(converteDate(data))).toString(),
      ano: getYear(new Date(converteDate(data))).toString(),
      data: converteDate(data),
      id: uuid(),
    };

    const dataResponse = await fetch("/api/receitas/receita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });
    const receita = await dataResponse.json();

    receitas.push(decrypt([receita.data])[0]);
    addReceitaFetch(receitas);
    reset([setData, setValor]);
    toggleReceita();
  }

  return (
    <Modal
      onOpen={() => toggleReceita()}
      open={isActiveModalReceita}
      closeIcon
      size="small"
      dimmer="blurring"
      onClose={() => toggleReceita()}
    >
      <Modal.Header content="Cadastro de receita" />
      <Modal.Content scrolling>
        <Grid columns="equal">
          <Grid.Row only="computer tablet">
            <Grid.Column>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <div className="required field">
                    <label>Valor</label>
                    <div className="ui input">
                      <CurrencyFormat
                        placeholder="Valor"
                        required
                        allowNegative={true}
                        decimalSeparator=","
                        inputMode="decimal"
                        onChange={(e: any) => setValor(e.target.value)}
                        type="text"
                        value={valor}
                      />
                    </div>
                  </div>
                  <Form.Input
                    type="date"
                    label="Data"
                    required
                    value={data}
                    onChange={handleData}
                  />
                </Form.Group>

                <Modal.Actions>
                  <Button content="Gravar" primary />
                </Modal.Actions>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <List>
                {receitaToForm.map((receita) => (
                  <List.Item key={receita.id}>
                    {receita.valor}
                    <Button
                      basic
                      icon="delete"
                      size="mini"
                      floated="right"
                      onClick={handleDeleteReceita}
                      value={receita}
                    />
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row only="mobile">
            <Grid.Column>
              <Form onSubmit={handleSubmit}>
                <div className="required field">
                  <label>Valor</label>
                  <div className="ui input">
                    <CurrencyFormat
                      placeholder="Valor"
                      required
                      allowNegative={false}
                      decimalSeparator=","
                      inputMode="decimal"
                      onChange={(e: any) => setValor(e.target.value)}
                      type="text"
                      value={valor}
                    />
                  </div>
                </div>
                <Form.Input
                  type="date"
                  label="Data"
                  required
                  value={data}
                  onChange={handleData}
                />

                <Modal.Actions>
                  <Button content="Gravar" primary />
                </Modal.Actions>
              </Form>
              <List>
                {receitaToForm.map((receita) => (
                  <List.Item key={receita.id}>
                    {receita.valor}
                    <Button
                      basic
                      icon="delete"
                      size="mini"
                      floated="right"
                      onClick={handleDeleteReceita}
                      value={receita}
                    />
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}
