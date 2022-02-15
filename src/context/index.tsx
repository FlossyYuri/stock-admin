import React, { useContext, useState } from 'react';
const AuthContext = React.createContext(undefined);

export const ABCTableProvider = ({ children }: any) => {
  const [table, setTable] = useState({
    a: 70,
    b: 20,
    c: 10,
  });

  const data: any = { table, setTable };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useABCTable = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useABCTable can only be used inside ABCTableProvider');
  }
  return context;
};
