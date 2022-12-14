import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Home Made`;
  }, [title]);
};

export default useTitle;
