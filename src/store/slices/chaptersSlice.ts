import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Chapter {
  id: string;
  name: string;
  city: string;
  responsable: string;
  createdAt: string;
}

interface ChaptersState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

const initialState: ChaptersState = {
  chapters: [
    { id: '1', name: 'Capítulo Principal', city: 'Bogotá', responsable: 'Admin', createdAt: new Date().toISOString() },
  ],
  loading: false,
  error: null,
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    addChapter: (state, action: PayloadAction<Chapter>) => {
      state.chapters.push(action.payload);
    },
    deleteChapter: (state, action: PayloadAction<string>) => {
      state.chapters = state.chapters.filter((c) => c.id !== action.payload);
    },
    updateChapter: (state, action: PayloadAction<Chapter>) => {
      const index = state.chapters.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.chapters[index] = action.payload;
      }
    },
  },
});

export const { addChapter, deleteChapter, updateChapter } = chaptersSlice.actions;
export default chaptersSlice.reducer;
