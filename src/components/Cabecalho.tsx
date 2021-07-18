import Router from "next/router";
import { useEffect, useState } from "react";

import { Header, Segment, Button, Popup } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

import { useUser } from "@auth0/nextjs-auth0";
import { findAnoInArray, MesCompras } from "../utils/filterDates";
export function load(fin?: any) {}

export default function Cabecalho() {
  const { detalhes, toggleDetalhes, selectAno, setSelectAno, addCompras } =
    useAppContext();

  const [changeAnoLeft, setChangeAnoLeft] = useState(false);
  const [changeAnoRigth, setChangeAnoRigth] = useState(false);
  const [titleAno, setTitleAno] = useState("");
  const { user } = useUser();
  const [counter, setCounter] = useState(0);

  const logout = async () => {
    Router.push("/api/auth/logout");
  };

  const anoSelectLeft = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
      setTitleAno(selectAno[counter - 1]);
    } else {
      setChangeAnoLeft(false);
    }
  };
  const anoSelectRigth = () => {
    let totalArray = selectAno.length - 1;
    let index = selectAno.indexOf(titleAno.toString());

    if (index !== totalArray) {
      setCounter(counter + 1);
      setTitleAno(selectAno[counter + 1]);
    } else if (index === totalArray) {
      setChangeAnoRigth(false);
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        await fetch(`/api/compras/loadInsert?user=${user?.sub}`).then(
          (response) => {
            response.json().then((data) => {
              const compras = MesCompras(data, titleAno);
              const anoTitle = findAnoInArray(compras.ano);

              addCompras(compras.mes);
              setSelectAno(compras.ano);
              if (compras.ano.length > 1) {
                if (titleAno === "") {
                  setTitleAno(anoTitle);
                }
                setChangeAnoRigth(true);
                setChangeAnoLeft(true);
              } else {
                setTitleAno(anoTitle);
              }
            });
          }
        );
      })();
      load();
    }
  }, [titleAno]); // eslint-disable-line
  return (
    <Segment.Group horizontal>
      <Segment>
        {detalhes && (
          <Popup
            content="Voltar"
            trigger={
              <Button
                icon="arrow left"
                size="mini"
                basic
                onClick={toggleDetalhes}
              />
            }
          />
        )}

        <Button
          className={changeAnoLeft && !detalhes ? "opacity100" : "opacity0"}
          icon="angle left"
          floated="right"
          size="mini"
          basic
          onClick={anoSelectLeft}
        />
      </Segment>
      <Segment textAlign="center">
        <Header as="h3" color="black" content={!detalhes ? titleAno : "Mes"} />
      </Segment>
      <Segment>
        <Button
          className={changeAnoRigth && !detalhes ? "opacity100" : "opacity0"}
          icon="angle right"
          size="mini"
          basic
          onClick={anoSelectRigth}
        />

        {detalhes ? (
          <Popup
            content="Filtrar"
            trigger={
              <Button
                icon="ellipsis vertical"
                size="tiny"
                floated="right"
                basic
              />
            }
          />
        ) : (
          <Popup
            content="Logout"
            trigger={
              <Button
                icon="sign out"
                size="tiny"
                basic
                floated="right"
                onClick={logout}
              />
            }
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
