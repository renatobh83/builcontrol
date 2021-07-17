import Router from "next/router";
import { useEffect, useState } from "react";
import { getYear } from "date-fns";
import { Header, Segment, Button, Grid } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

import { useUser } from "@auth0/nextjs-auth0";
import { findAnoInArray, MesCompras } from "../utils/filterDates";
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
    } else {
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
    }
  }, [titleAno]);
  return (
    <Segment>
      <Grid columns="equal">
        <Grid.Column>
          {detalhes && (
            <Button icon="arrow left" size="mini" onClick={toggleDetalhes} />
          )}
        </Grid.Column>
        <Grid.Column>
          <Grid columns={3} textAlign="center">
            <Grid.Column>
              {changeAnoLeft && !detalhes && (
                <Button
                  icon="angle left"
                  size="mini"
                  basic
                  onClick={anoSelectLeft}
                />
              )}
            </Grid.Column>
            <Grid.Column>
              <Header
                as="h3"
                color="black"
                content={!detalhes ? titleAno : "Mes"}
              />
            </Grid.Column>
            <Grid.Column>
              {changeAnoRigth && !detalhes && (
                <Button
                  icon="angle right"
                  size="mini"
                  basic
                  onClick={anoSelectRigth}
                />
              )}
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column>
          {detalhes ? (
            <Button
              icon="ellipsis vertical"
              size="tiny"
              floated="right"
              basic
            />
          ) : (
            <Button
              icon="sign out"
              size="tiny"
              basic
              floated="right"
              onClick={logout}
            />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
