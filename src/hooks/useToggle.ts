import { useCallback, useState } from "react";

export default function useToggle(initialState: boolean = false) {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((value?: boolean) => {
    setState((previousState: boolean) =>
      value !== undefined ? value : !previousState
    );
  }, []);
  return [state, toggle] as const;
}
