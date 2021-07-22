import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import {
  Segment,
  Label,
  Button,
  Modal,
  Item,
  Divider,
  Grid,
} from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { groupby } from "../utils/filterDates";
export default function DetalhesMes() {
  const {
    comprasMes,
    compratoFetch,
    setDetalhes,
    setEditarCompra,
    toggleActive,
    setComprastoFetch,
    dataFetch,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleEditar = (compra) => {
    if (compra.formaPagamento !== "credito") {
      // setEditarCompra(compra);
      // toggleActive();
    } else {
      setOpen(true);
    }
  };

  const handleApagar = async (id) => {
    if (id.numParcela > 1) return setOpen2(true);
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

                          <Grid.Row>
                            {compra.numParcela && (
                              <span className="stay">
                                Parcelado {compra.numParcela} -{" "}
                                {compra.parcelas}
                              </span>
                            )}
                            {compra.recorrente && (
                              <span className="stay">Recorrente</span>
                            )}
                          </Grid.Row>
                          <Grid.Row>
                            {compra.parcelas - compra.numParcela === 0
                              ? ""
                              : `Resta : ${
                                  compra.valor.$numberDecimal *
                                  (compra.parcelas - compra.numParcela)
                                }`}
                          </Grid.Row>
                        </Item.Meta>
                      </Item.Content>
                    </Item>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Grid.Row>{compra.categoria}</Grid.Row>
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
                          </Item.Meta>
                          <Item.Description>
                            {compra.categoria}
                          </Item.Description>
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
                              : `Resta : ${
                                  compra.valor.$numberDecimal *
                                  (compra.parcelas - compra.numParcela)
                                }`}
                          </Grid.Row>
                        </>
                      )}
                      {compra.recorrente && (
                        <span className="stay">Recorrente</span>
                      )}
                    </Item.Description>
                  </Grid.Column>
                  <Grid.Column
                    width="5"
                    textAlign="center"
                    verticalAlign="middle"
                  >
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
          <Modal
            open={open2}
            size="mini"
            dimmer="blurring"
            onClose={() => setOpen2(false)}
            onOpen={() => setOpen2(true)}
            content="Favor selecionar a primeira parcela para apagar movimento."
            actions={[{ key: "done", content: "Ok", positive: true }]}
          />
        </Fragment>
      ))}
    </>
  );
}
