import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import {
  comprasByAno,
  findAnoInArray,
  groupByCompras,
} from "../utils/filterDates";
import { useUser } from "@auth0/nextjs-auth0";
interface AppProviderProps {
  children: ReactNode;
}
interface IContextValues {
  compratoFetch: string[];
  isActive: boolean;
  detalhes: boolean;
  isActiveModalReceita: boolean;
  userPurchaseByYear: string[];
  userPurchases: string[];
  titleYear: string;
  receitas: string[];
  objReceita: {};
  setReceitas: (p: any) => void;
  toggleDetalhes: () => void;
  toggleActive: () => void;
  toggleReceita: () => void;
  setTitleYear: (p: any) => void;
  setUserPurchaseByYear: (p: any) => void;
  setUserPurchases: (p: any) => void;
  dataFetch: (p: any) => void;
  setComprastoFetch: (p: any) => void;
  setisActiveModalReceita: (p: any) => void;
  addReceitaFetch: (p: any) => void;
  setObjReceita: (p: any) => void;
}

export const AppContext = createContext({} as IContextValues);
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }: AppProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [isActiveModalReceita, setisActiveModalReceita] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [objReceita, setObjReceita] = useState([]);
  const [compratoFetch, setComprastoFetch] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [userPurchaseByYear, setUserPurchaseByYear] = useState<string[]>([]);
  const [titleYear, setTitleYear] = useState("");
  const { user, checkSession, isLoading, error } = useUser();
  // form cadastro nova compra
  function toggleActive() {
    setIsActive(!isActive);
  }

  // detalhas mes
  function toggleDetalhes() {
    setDetalhes(!detalhes);
  }

  // adicinonar receita
  function toggleReceita() {
    setisActiveModalReceita(!isActiveModalReceita);
  }
  function addReceitaFetch(data: any) {
    const receitaAno = comprasByAno(data);
    const receitas = groupByCompras(data, findAnoInArray(receitaAno));
    setObjReceita(receitas);
    setReceitas(data);
  }

  // setComprasFetch control years
  function dataFetch(data: any) {
    const purchasesInYears = comprasByAno(data);
    const purchases = groupByCompras(data, findAnoInArray(purchasesInYears));
    setUserPurchases(purchases);
    setComprastoFetch(data);
    setUserPurchaseByYear(purchasesInYears);

    if (purchasesInYears.length > 1) {
      if (titleYear === "") {
        setTitleYear(findAnoInArray(purchasesInYears));
      }
    } else {
      setTitleYear(findAnoInArray(purchasesInYears));
    }
  }

  useEffect(() => {
    console.log(error, isLoading);
    if (user) {
      (async () => {
        console.log(user?.sub);
        const response = await fetch(
          `/api/compras/loadInsert?user=${user?.sub}`
        );
        const { data } = await response.json();
        dataFetch(data);
        console.log(data);
        // const responseFetch = await fetch(
        //   `/api/receitas/receita?user=${user?.sub}`
        // );
        // const respnseJson = await responseFetch.json();
        // addReceitaFetch(respnseJson.data);
      })();
    }

    console.log("efect in provider");
  }, []);

  const objValues = {
    toggleActive,
    toggleDetalhes,
    setisActiveModalReceita,
    toggleReceita,
    setReceitas,
    receitas,
    isActiveModalReceita,
    detalhes,
    isActive,
    compratoFetch,
    setComprastoFetch,
    userPurchaseByYear,
    titleYear,
    setTitleYear,
    setUserPurchaseByYear,
    dataFetch,
    userPurchases,
    setUserPurchases,
    addReceitaFetch,
    objReceita,
    setObjReceita,
  };

  return (
    <AppContext.Provider value={objValues}>{children}</AppContext.Provider>
  );
}
export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = getSession(req, res);
  console.log(session);
  return {
    props: { user: session?.user ?? null },
  };
}
