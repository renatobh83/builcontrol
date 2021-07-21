import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import {
  Segment,
  Label,
  Button,
  Header,
  Modal,
  Icon,
  Divider,
  Grid,
} from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { groupby } from "../utils/filterDates";
export default function DetalhesMes() {
  const { comprasMes, toggleActive, setEditarCompra } = useAppContext();
  const [open, setOpen] = useState(false);
  const handleEditar = (compra) => {
    console.log(compra);
    if (compra.formaPagamento !== "credito") {
      setEditarCompra(compra);
      toggleActive();
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {}, []);
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
                    {compra.descr} - R$ {compra.valor.$numberDecimal}
                    <Grid.Column>{compra.categoria}</Grid.Column>
                    <Divider />
                    <Button.Group size="mini">
                      <Button positive onClick={() => handleEditar(compra)}>
                        Editar
                      </Button>
                      <Button.Or text="Ou" />
                      <Button negative>Apagar</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row only="computer tablet">
                  <Grid.Column>
                    {compra.descr} - R$ {compra.valor.$numberDecimal}
                  </Grid.Column>
                  <Grid.Column>{compra.categoria}</Grid.Column>
                  <Grid.Column width="5">
                    <Button.Group>
                      <Button positive onClick={() => handleEditar(compra)}>
                        Editar
                      </Button>
                      <Button.Or text="Ou" />
                      <Button negative>Apagar</Button>
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
