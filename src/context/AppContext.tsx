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
}

export const AppContext = createContext({} as IContextValues);
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }: AppProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [detalhes, setDetalhes] = useState(true);
  const [compraUser, setComprasUser] = useState([]);

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
  };
  return (
    <AppContext.Provider value={objValues}>{children}</AppContext.Provider>
  );
}
