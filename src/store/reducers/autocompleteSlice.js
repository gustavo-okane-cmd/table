import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export const fetchAutocomplete = createAsyncThunk(
    "fetchAutocomplete",
    async (searchTerm, { getState, requestId }) => {
        const response = await axios.get(
            `https://www.env2.node2.comdinheiro.com.br/Clientes/INTER_COMPARADOR/autocomplete.php?term=${searchTerm}&ativos=`
        );
        return response.data;
    }
);

const initialState = {
    // options: { 0: [] },
    options: [],
    loadingAutocomplete: { 0: false },
    term: { 0: "" },
    waiting: { 0: null },
}

const defaultNewEntry = {
    options: [],
    loadingAutocomplete: false,
    term: "",
    waiting: null,
}

const autocompleteSlice = createSlice({
    name: "autocomplete",
    initialState: initialState,
    reducers: {
        addCase(state, action) {
            const {id} = action.payload;
            for (const property in initialState) {
                if(property!='options') state.property.id = defaultNewEntry.property;
            }
        },
        setOptions(state, action) {
            const value = action.payload;
            state.options = value;
        },
    },
    extraReducers: {
        [fetchAutocomplete.pending]: (state, action) => {
            state.loadingAutocomplete = true;
        },
        [fetchAutocomplete.fulfilled]: (state, action) => {
            state.options = action.payload;
            state.loadingAutocomplete = false;
        },
        [fetchAutocomplete.rejected]: (state, action) => {
            console.log(action);
            state.options = action.payload;
            state.loadingAutocomplete = false;
        },
        [HYDRATE]: (state, action) => {
            // console.log("HYDRATE", state, action.payload);
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

// export const { setAtivo, adicionarAtivo, removerAtivo } = ativosSlice.actions;
export const { setLoasetLoadingAutocompleteding, addCase, setOpen, setOptions } =
    autocompleteSlice.actions;

export const selectLoadingAutocomplete = (state) =>
    state.autocomplete.loadingAutocomplete;
export const selectOptions = (state) => state.autocomplete.options;

export default autocompleteSlice.reducer;
