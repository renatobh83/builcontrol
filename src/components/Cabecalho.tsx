import Router from "next/router";
import { useEffect } from "react";
import { Button, Menu, Popup, Label, Dropdown } from "semantic-ui-react";
import { useAppContext } from "../context/AppContext";
import { groupByCompras } from "../utils/filterDates";

export default function Cabecalho() {
  const {
    detalhes,
    toggleDetalhes,
    compratoFetch,
    userPurchaseByYear,
    titleYear,
    mesDetalhe,
    setTitleYear,
    setUserPurchases,
    setObjReceita,
    receitas,
  } = useAppContext();

  const logout = async () => {
    Router.push("/api/auth/logout");
  };
  const changeAno = (e: any, { value }: any) => {
    setTitleYear(value);
  };

  useEffect(() => {
    setUserPurchases(groupByCompras(compratoFetch, titleYear));
    setObjReceita(groupByCompras(receitas, titleYear));
  }, [titleYear]); // eslint-disable-line

  return (
    <Menu pointing secondary fluid widths={3}>
      <Menu.Item>
        <Menu.Menu position="left">
          {detalhes && (
            <Popup
              size="mini"
              content="Voltar"
              trigger={
                <Button
                  basic
                  size="large"
                  icon="arrow left"
                  onClick={toggleDetalhes}
                ></Button>
              }
            />
          )}
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        {detalhes ? (
          <Label
            size="huge"
            color="grey"
            content={!detalhes ? titleYear : mesDetalhe}
          />
        ) : (
          <Dropdown item text={titleYear}>
            <Dropdown.Menu>
              {userPurchaseByYear.length >= 1 &&
                userPurchaseByYear.map((ano) => (
                  <Dropdown.Item key={ano} onClick={changeAno} value={ano}>
                    {ano}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu position="right">
          <Popup
            content="Logout"
            trigger={
              <Button icon="sign out" basic size="large" onClick={logout} />
            }
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
