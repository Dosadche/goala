import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QueryConstraint,
  updateDoc,
  type DocumentData,
  type Firestore,
  type UpdateData,
} from "firebase/firestore";

export default function createFirestoreService<T extends DocumentData>(
  db: Firestore,
  collectionName: string,
) {
  const colRef = collection(db, collectionName) as CollectionReference<T>;
  return {
    subscribe(
      constraints: QueryConstraint[],
      callback: (data: (T & { id: string })[]) => void,
    ) {
      const q = query(colRef, ...constraints);
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as T),
          id: doc.id,
        }));
        callback(data);
      });
    },
    async create(data: T) {
      return addDoc(colRef, data);
    },
    async update(id: string, partialData: UpdateData<T>) {
      return updateDoc(doc(colRef, id), partialData);
    },
    async delete(id: string) {
      return deleteDoc(doc(colRef, id));
    },
  };
}
