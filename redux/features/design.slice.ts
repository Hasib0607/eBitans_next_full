import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localstorage";
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state type
interface DesignState {
    designData: {
      header_color?: string;
      text_color?: string;
      logo?: string;
      website_name?: string;
    } | null;
  }

// Initial state with local storage persistence
const initialState: DesignState = {
    designData: getFromLocalStorage("design") || "null",
}

// Create the slice
const designSlice = createSlice({
    name: 'design',
    initialState,
    reducers: {
        saveDesignData: (state, action) => {
            state.designData = action.payload;
            saveToLocalStorage("design", action.payload);
        },
        loadDesignData: (state) => {
            const savedData = getFromLocalStorage("design") || "null";
            state.designData = savedData;
        },
    },
});

const {reducer, actions} = designSlice;

// Export actions
export const {saveDesignData, loadDesignData} = actions;

// Export reducer
export default reducer;