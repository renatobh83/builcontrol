import { createContext, ReactNode, useContext, useState } from "react";
interface AppProviderProps {
  children: ReactNode;
}
interface IContextValues {
  isActive: boolean;
  detalhes: boolean;
  toggleDetalhes: () => void;
  toggleActive: () => void;
  compraUser: {};
  addCompras: (...p) => void;
  setSelectAno: (p) => void;
  selectAno: string;
}

export const AppContext = createContext({} as IContextValues);
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }: AppProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [compraUser, setComprasUser] = useState([]);
  const [selectAno, setSelectAno] = useState([]);

  function toggleActive() {
    setIsActive(!isActive);
  }

  function toggleDetalhes() {
    setDetalhes(!detalhes);
  }

  function addCompras(value: any) {
    setComprasUser(value);
  }
  const objValues = {
    isActive,
    toggleActive,
    detalhes,
    toggleDetalhes,
    compraUser,
    addCompras,
    selectAno,
    setSelectAno,
  };
  return (
    <AppContext.Provider value={objValues}>{children}</AppContext.Provider>
  );
}
