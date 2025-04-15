import { create } from "zustand";

interface IState {
    items: string;
    setItems: (datas: string) => void;
}

const useItemsState = create<IState>((set) => ({
    items: "",
    setItems: (datas: string) => set({ items: datas }),
}));

export default useItemsState;
