import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  comprasByAno,
  findAnoInArray,
  groupByCompras,
} from "../utils/filterDates";
import { Meses } from "../utils/meses";

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
  edtiarCompra: string[];
  objReceita: {};
  receitaToForm: string[];
  mesDetalhe: string;
  comprasMes: string[];
  changeAnoRigth: boolean;
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
  setReceitaToForm: (p: any) => void;
  setEditarCompra: (p: any) => void;
  setDetalhes: (p: any) => void;
  setChangeAnoRigth: (p: any) => void;
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
  const [receitaToForm, setReceitaToForm] = useState([]);
  const [mesDetalhe, setMesDetalhe] = useState("");
  const [comprasMes, setComprasMes] = useState([]);
  const [edtiarCompra, setEditarCompra] = useState([]);

  // form cadastro nova compras
  function toggleActive() {
    setIsActive(!isActive);
  }

  // detalhas mes
  function toggleDetalhes(e, { value }) {
    if (value) {
      setMesDetalhe(Meses(value));
      setComprasMes(userPurchases[value]);
    }
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

  const objValues = {
    toggleActive,
    toggleDetalhes,
    setisActiveModalReceita,
    toggleReceita,
    setReceitas,
    receitas,
    setDetalhes,
    isActiveModalReceita,
    detalhes,
    isActive,
    comprasMes,
    compratoFetch,
    setComprastoFetch,
    userPurchaseByYear,
    titleYear,
    setTitleYear,
    mesDetalhe,
    setUserPurchaseByYear,
    dataFetch,
    userPurchases,
    setUserPurchases,
    addReceitaFetch,
    objReceita,
    setObjReceita,
    setReceitaToForm,
    receitaToForm,
    edtiarCompra,
    setEditarCompra,
  };

  return (
    <AppContext.Provider value={objValues}>{children}</AppContext.Provider>
  );
}
