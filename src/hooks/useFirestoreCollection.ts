import type { QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { FirestoreEntity } from "../interfaces/firestore-entity.type";

export default function useFirestoreCollection<T>(
  service: {
    subscribe: (
      constraints: QueryConstraint[],
      callback: (data: FirestoreEntity<T>[]) => void,
    ) => void;
  },
  constraints: QueryConstraint[],
  customMapCallback?: (data: FirestoreEntity<T>[]) => FirestoreEntity<T>[],
) {
  const [data, setData] = useState<FirestoreEntity<T>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = service.subscribe(
      constraints,
      (items: FirestoreEntity<T>[]) => {
        setData(customMapCallback ? customMapCallback(items) : items);
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, [JSON.stringify(constraints)]);

  return {
    data,
    isLoading,
  };
}
