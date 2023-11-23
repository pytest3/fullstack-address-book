import React, { createContext } from "react";

export const NameContext = createContext({ firstName: "", lastName: "" });

function NameProvider({ children, fetchedName }) {
  const [name, setName] = React.useState({ firstName: "", lastName: "" });

  React.useEffect(() => {
    setName(fetchedName);
  }, [fetchedName]);

  const handleNameInput = React.useCallback((e) => {
    setName((name) => {
      return { ...name, [e.target.name]: e.target.value };
    });
  }, []);

  const value = React.useMemo(() => {
    return { name, handleNameInput };
  }, [name]);

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
}

export default React.memo(NameProvider);
