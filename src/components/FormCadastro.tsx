import { useState } from "react";
import { Button, Checkbox, Modal, Form, Label } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

interface IPropsChange {
  value: string;
}
export default function FormCadastro() {
  const { isActive, toggleActive } = useAppContext();
  const [categoria, setCategoria] = useState("");

  function handleChange(e: any, { value }: IPropsChange) {
    setCategoria(value);
  }

  function exitModal() {
    setCategoria("");
    toggleActive();
  }

  const options = [
    { key: "cd", value: "cd", text: "Credito" },
    { key: "db", value: "db", text: "Debito" },
    { key: "av", value: "av", text: "A vista" },
  ];
  return (
    <Modal onOpen={() => toggleActive()} open={isActive}>
      <Modal.Header>Adicionar compra</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control="input"
                placeholder="Compra"
                label="Compra"
                required
              />
              <Form.Field
                control="input"
                placeholder="Valor"
                label="Valor"
                required
              />
            </Form.Group>
            <Form.Group widths={3}>
              <Form.Input type="date" label="Data compra" required />
              <Form.Select
                label="Forma pagamento"
                required
                options={options}
                placeholder="Forma pagamento"
              />
              <Form.Input label="Parcelas" required />
            </Form.Group>
            <Form.Field>
              <Checkbox label="Recorrente" name="recor" />
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
          onClick={exitModal}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
