import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const StickyContext = createContext(false);
export const useSticky = () => useContext(StickyContext);

interface StickyProviderProps {
  content: ReactNode;
}

const StickyProvider = ({ content }: StickyProviderProps) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const makeSticky = () => {
      setSticky(window.scrollY >= 20);
    };

    window.addEventListener("scroll", makeSticky);

    //prevents memory leaks and rerendering the elements
    return () => {
      window.removeEventListener("scroll", makeSticky);
    };
  }, []);

  return (
    <StickyContext.Provider value={sticky}>{content}</StickyContext.Provider>
  );
};

export default StickyProvider;
