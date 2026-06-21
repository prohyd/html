import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];       // для M и O: перемещаемые элементы
  selections: (string | null)[]; // для S: выбранный вариант ответа
}

const initialState: ListsState = {
  lists: [],
  selections: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists.splice(index, 0, items);
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      if (index >= 0 && index < state.lists.length) {
        state.lists[index] = items;
      }
    },
    setSelection: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.selections[index] = value;
    },
    resetLists: () => initialState,
  },
});

export const { addList, setDraggedItems, setSelection, resetLists } = listsSlice.actions;
export default listsSlice.reducer;