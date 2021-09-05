import { useCallback, useState } from "react";
import { Button, Item, Grid, Modal, Header, Icon } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
export default function GridCompras({ compra }) {
  const [open, setOpen] = useState(false);
  const { compratoFetch, setDetalhes, setComprastoFetch, dataFetch } =
    useAppContext();

  const apagar = useCallback(async (id) => {
    await fetch(`/api/compras/loadInsert?identifier=${id.identifier}`, {
      method: "DELETE",
    });
    const newArray = compratoFetch.filter(
      (idCompra) => idCompra.identifier !== id.identifier
    );
    setComprastoFetch(newArray);
    dataFetch(newArray);
    setDetalhes(false);
  }, []);
  return (
    <>
      <Grid.Column>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{compra.descr}</Item.Header>
              <Item.Meta>
                <span className="price">R$ {compra.valor} </span>
              </Item.Meta>
              <Item.Description>{compra.categoria}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column>
        <Item.Description>
          {compra.numParcela && (
            <>
              <span className="stay">
                Parcelado {compra.numParcela} -{compra.parcelas}{" "}
              </span>
              <Grid.Row>
                {compra.parcelas - compra.numParcela === 0
                  ? ""
                  : `Resta : ${(
                      compra.valor *
                      (compra.parcelas - compra.numParcela)
                    ).toFixed(2)}`}
              </Grid.Row>
            </>
          )}
          {compra.recorrente && <span className="stay">Recorrente</span>}
        </Item.Description>
      </Grid.Column>
      <Grid.Column width="5" textAlign="center" verticalAlign="middle">
        <Button negative onClick={() => setOpen(true)}>
          Apagar
        </Button>
      </Grid.Column>
      <Modal
        closeIcon
        open={open}
        dimmer="blurring"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header content="Apagar movimento" />
        <Modal.Content>
          <p>Voce esta certo que deseja apagar movimento </p>
          <p>Esta operação não poderá ser desfeita</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Nao
          </Button>
          <Button color="green" onClick={() => apagar(compra)}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
