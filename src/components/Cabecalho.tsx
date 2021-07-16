import Router from "next/router";
import { useEffect, useState } from "react";
import { getYear } from "date-fns";
import { Header, Segment, Button, Grid } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

import { useUser } from "@auth0/nextjs-auth0";
import { MesCompras } from "../utils/filterDates";
export default function Cabecalho() {
  const {
    detalhes,
    toggleDetalhes,
    selectAno,
    compraUser,
    setSelectAno,
    addCompras,
  } = useAppContext();

  const [changeAnoLeft, setChangeAnoLeft] = useState(false);
  const [changeAnoRigth, setChangeAnoRigth] = useState(false);
  const [titleAno, setTitleAno] = useState(getYear(new Date()).toString());
  const { user, error, isLoading } = useUser();
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

  useEffect(async () => {
    if (user) {
      await fetch(`/api/compras/loadInsert?user=${user?.sub}`).then(
        (response) => {
          response.json().then((data) => {
            addCompras(MesCompras(data, titleAno).mes);
            MesCompras(data, titleAno).mes;
            setSelectAno(MesCompras(data).ano);
            setChangeAnoRigth(true);
            setChangeAnoLeft(true);
          });
        }
      );
    }
  }, [titleAno]);
  return (
    <Segment>
      <Grid columns="equal">
        <Grid.Column>
          {detalhes && (
            <Button
              icon="arrow left"
              size="tiny"
              basic
              onClick={toggleDetalhes}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Grid columns={3} textAlign="center">
            <Grid.Column>
              {changeAnoLeft && (
                <Button icon="angle left" basic onClick={anoSelectLeft} />
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
              {changeAnoRigth && (
                <Button icon="angle right" basic onClick={anoSelectRigth} />
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
