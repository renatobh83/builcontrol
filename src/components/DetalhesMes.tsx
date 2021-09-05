import { format } from "date-fns";
import Head from "next/head";
import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
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
import GridCompras from "./GridCompras";
import { groupby } from "../utils/filterDates";

export default function DetalhesMes() {
  const {
    comprasMes,
    mesDetalhe,
    compratoFetch,
    setDetalhes,
    setEditarCompra,
    toggleActive,
    setTotalCasa,
    setTotalPessoal,
    setComprastoFetch,
    dataFetch,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // const handleEditar = (compra) => {
  //   if (compra.formaPagamento !== "credito") {
  //     setEditarCompra(compra);
  //     toggleActive();
  //   } else {
  //     setOpen(true);
  //   }
  // };

  let totalCasa = 0;
  let totalPessoal = 0;
  useEffect(() => {
    comprasMes.forEach((compra) => {
      if (compra.categoria === "Casa") {
        totalCasa = totalCasa + +compra.valor;
        setTotalCasa(totalCasa);
      } else {
        totalPessoal = totalPessoal + +compra.valor;
        setTotalPessoal(totalPessoal);
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>{mesDetalhe}</title>
      </Head>
      {Object.keys(groupby(comprasMes, "data")).map((dataCompra) => (
        <Fragment key={dataCompra}>
          <Label
            pointing="below"
            color="red"
            basic
            content={format(new Date(dataCompra), "dd/MM")}
          />
          {groupby(comprasMes, "data")[dataCompra].map((compra) => (
            <Segment raised key={compra._id}>
              <Grid columns="equal">
                <Grid.Row only="mobile">
                  <GridCompras compra={compra} />
                </Grid.Row>
                <Grid.Row only="computer tablet">
                  <GridCompras compra={compra} />
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
