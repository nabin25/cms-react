import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const interval = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearInterval(interval);
  }, [delay, value]);
  return debouncedValue;
};

export default useDebounce;
