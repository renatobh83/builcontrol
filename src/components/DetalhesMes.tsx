import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import {
  Segment,
  Label,
  Button,
  Header,
  Modal,
  Icon,
  Item,
  Divider,
  Grid,
} from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { groupby } from "../utils/filterDates";
export default function DetalhesMes() {
  const {
    comprasMes,
    toggleActive,
    setEditarCompra,
    compratoFetch,
    setDetalhes,
    setComprastoFetch,
    dataFetch,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const handleEditar = (compra) => {
    if (compra.formaPagamento !== "credito") {
      // setEditarCompra(compra);
      // toggleActive();
    } else {
      setOpen(true);
    }
  };

  const handleApagar = async (id) => {
    if (id.numParcela > 1) return setOpen(true);
    await fetch(`/api/compras/loadInsert?identifier=${id.identifier}`, {
      method: "DELETE",
    });
    const newArray = compratoFetch.filter(
      (idCompra) => idCompra.identifier !== id.identifier
    );

    setComprastoFetch(newArray);
    dataFetch(newArray);
    setDetalhes(false);
  };

  return (
    <>
      {Object.keys(groupby(comprasMes, "data")).map((dataCompra) => (
        <Fragment key={dataCompra}>
          <Label
            ribbon
            color="red"
            content={format(new Date(dataCompra), "dd/MM")}
          />
          {groupby(comprasMes, "data")[dataCompra].map((compra) => (
            <Segment raised key={compra._id}>
              <Grid columns="equal">
                <Grid.Row only="mobile">
                  <Grid.Column>
                    <Item>
                      <Item.Content>
                        <Item.Header>{compra.descr}</Item.Header>
                        <Item.Meta>
                          <span className="price">
                            R$ {compra.valor.$numberDecimal}{" "}
                          </span>
                          {compra.numParcela && (
                            <span className="stay">
                              Parcelado {compra.numParcela} - {compra.parcelas}
                            </span>
                          )}
                        </Item.Meta>
                      </Item.Content>
                    </Item>
                    <Grid.Column>{compra.categoria}</Grid.Column>
                    <Divider />
                    <Button.Group size="mini">
                      <Button positive onClick={() => handleEditar(compra)}>
                        Editar
                      </Button>
                      <Button.Or text="Ou" />
                      <Button negative onClick={() => handleApagar(compra)}>
                        Apagar
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row only="computer tablet">
                  <Grid.Column>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Item.Header>{compra.descr}</Item.Header>
                          <Item.Meta>
                            <span className="price">
                              R$ {compra.valor.$numberDecimal}{" "}
                            </span>
                            {compra.numParcela && (
                              <span className="stay">
                                Parcelado {compra.numParcela} -{" "}
                                {compra.parcelas}
                              </span>
                            )}
                          </Item.Meta>
                          <Item.Description>
                            {compra.categoria}
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                  {/* <Grid.Column>{compra.categoria}</Grid.Column> */}
                  <Grid.Column width="5">
                    <Button.Group>
                      <Button positive onClick={() => handleEditar(compra)}>
                        Editar
                      </Button>
                      <Button.Or text="Ou" />
                      <Button negative onClick={() => handleApagar(compra)}>
                        Apagar{" "}
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          ))}
          <Modal
            open={open}
            size="mini"
            dimmer="blurring"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            content="Lançamento parcelado não pode ser editado."
            actions={[{ key: "done", content: "Ok", positive: true }]}
          />
        </Fragment>
      ))}
    </>
  );
}
