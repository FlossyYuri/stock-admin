import React, { useContext, useState } from 'react';
const AuthContext = React.createContext(undefined);

export const ABCTableProvider = ({ children }: any) => {
  const [table, setTable] = useState({
    a: 80,
    b: 15,
    c: 5,
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
