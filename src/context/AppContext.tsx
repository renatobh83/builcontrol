import { createContext, ReactNode, useContext, useState } from "react";
interface AppProviderProps {
  children: ReactNode;
}
interface IContextValues {
  isActive: boolean;
  detalhes: boolean;
  isActiveModalReceita: boolean;
  selectAno: string;
  compraUser: string[];
  receitas: string[];
  setReceitas: (p: any) => void;
  toggleDetalhes: () => void;
  toggleActive: () => void;
  toggleReceita: () => void;
  addCompras: (p: any) => void;
  setSelectAno: (p: any) => void;
}

export const AppContext = createContext({} as IContextValues);
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }: AppProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [compraUser, setComprasUser] = useState([]);
  const [selectAno, setSelectAno] = useState("");
  const [isActiveModalReceita, setisActiveModalReceita] = useState(false);
  const [receitas, setReceitas] = useState([]);

  function toggleActive() {
    setIsActive(!isActive);
  }

  function toggleDetalhes() {
    setDetalhes(!detalhes);
  }

  function toggleReceita() {
    setisActiveModalReceita(!isActiveModalReceita);
  }

  function addCompras(value: any) {
    setComprasUser(value);
  }
  const objValues = {
    toggleActive,
    toggleDetalhes,
    addCompras,
    setSelectAno,
    toggleReceita,
    setReceitas,
    receitas,
    isActiveModalReceita,
    detalhes,
    compraUser,
    isActive,
    selectAno,
  };
  return (
    <AppContext.Provider value={objValues}>{children}</AppContext.Provider>
  );
}
