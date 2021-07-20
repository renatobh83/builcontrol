import Router from "next/router";
import { useEffect, useState } from "react";

import { Header, Segment, Button, Popup } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";

import { useUser } from "@auth0/nextjs-auth0";
import { groupByCompras } from "../utils/filterDates";
export function load(fin?: any) {}

export default function Cabecalho() {
  const {
    detalhes,
    toggleDetalhes,
    compratoFetch,
    userPurchaseByYear,
    titleYear,
    setTitleYear,
    dataFetch,
    userPurchases,
    addReceitaFetch,
    setUserPurchases,
    setObjReceita,
    receitas,
  } = useAppContext();

  const { user } = useUser();
  const [changeAnoLeft, setChangeAnoLeft] = useState(false);
  const [changeAnoRigth, setChangeAnoRigth] = useState(false);
  const [counter, setCounter] = useState(0);

  const logout = async () => {
    Router.push("/api/auth/logout");
  };

  const anoSelectLeft = () => {
    if (counter != 0) {
      setCounter(counter - 1);
      setTitleYear(userPurchaseByYear[counter - 1]);
    }
    if (counter - 1 === 0) {
      setChangeAnoLeft(false);
    }
    setChangeAnoRigth(true);
  };

  const anoSelectRigth = () => {
    if (counter < userPurchaseByYear.length - 1) {
      setCounter(counter + 1);
      setTitleYear(userPurchaseByYear[counter + 1]);
      if (counter + 1 === userPurchaseByYear.length - 1) {
        setChangeAnoRigth(false);
      }
      setChangeAnoLeft(true);
    }
  };

  useEffect(() => {
    if (user) {
      setUserPurchases(groupByCompras(compratoFetch, titleYear));
      setObjReceita(groupByCompras(receitas, titleYear));
      if (userPurchaseByYear.length > 1) {
        if (counter === userPurchaseByYear.length - 1) {
          setChangeAnoRigth(false);
        } else {
          setChangeAnoRigth(true);
        }
      }
      // load();
    }
  }, [titleYear]); // eslint-disable-line
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
        <Header as="h3" color="black" content={!detalhes ? titleYear : "Mes"} />
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
