import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialData = [
  ["", "04/02/1998", "04/02/2010", "04/02/2021"],
  ["PETR4", "100", "50", "50"],
  ["VALE3", "0", "50", "25"],
  ["ITUB4", "0", "0", "25"],
];

// const initialState = {
//   dados: {
//     1: {
//       array: ["", "04/02/1998", "04/02/2010", "04/02/2016", "04/02/2021"],
//     },
//     2: {
//       array: ["PETR4", "100", "50", "50", "50"],
//     },
//     3: {
//       array: ["VALE3", "0", "50", "25", "30"],
//     },
//     4: {
//       array: ["ITUB4", "0", "0", "25", "20"],
//     },
//   },
//   rowOrder: [1, 2, 3, 4],
//   last_id: 4,
//   columns: 5,
//   rows: 4,
// };

const initialState = {
  dates: {
    // 1: "04/02/1998",
    // 2: "04/02/2010",
    // 3: "04/02/2016",
    // 4: "04/02/2021",
    1: new Date('1998-02-04T21:00:00'),
    2: new Date('2010-02-04T21:00:00'),
    3: new Date('2016-02-04T21:00:00'),
    4: new Date('2021-02-04T21:00:00'),
  },
  ativos: {
    1: "PETR4",
    3: "VALE3",
    2: "ITUB4",
  },
  datesOrder: [1, 2, 3, 4],
  ativosOrder: [1, 3, 2],
  //dados separados por id de ativo, por id de data
  data: {
    1: {
      1: "100",
      2: "50",
      3: "50",
      4: "50",
    },
    2: {
      1: "0",
      2: "50",
      3: "25",
      4: "30",
    },
    3: {
      1: "0",
      2: "0",
      3: "25",
      4: "20",
    },
  },
  // data: {
  //   1: "100",
  //   2: "50",
  //   3: "50",
  //   4: "50",
  //   5: "0",
  //   6: "50",
  //   7: "25",
  //   8: "30",
  //   8: "0",
  //   10: "0",
  //   11: "25",
  //   12: "20",
  // },
  // dataByAtivoByDate: {
  //   1: {
  //     1: 1,
  //     2: 2,
  //     3: 3,
  //     4: 4,
  //   },
  //   2: {
  //     1: 5,
  //     2: 6,
  //     3: 7,
  //     4: 8,
  //   },
  //   3: {
  //     1: 9,
  //     2: 10,
  //     3: 11,
  //     4: 12,
  //   },
  // },
  lastId: 12,
  lastDateId: 4,
  lastAtivoId: 3,
};

export const tabelaSlice = createSlice({
  name: "tabela",
  initialState,

  reducers: {
    addDelColumn: (state, action) => {
      if (action.payload.add_del == "add") {
        state.lastDateId += 1;
        const dateId = state.lastDateId;
        state.dates[dateId] = "";
        let newOrder = [...state.datesOrder];
        newOrder.splice(action.payload.i, 0, dateId);
        state.datesOrder = newOrder;
        const ativos = [...state.ativosOrder];
        ativos.forEach((e) => {
          state.data[e][dateId] = "";
        });
      } else {
        const dateId = state.datesOrder[action.payload.i];

        state.datesOrder.splice(action.payload.i, 1);
        delete state.dates[dateId];

        state.ativosOrder.forEach((e) => {
          delete state.data[e][dateId];
        });
      }
    },
    addDelRow: (state, action) => {
      if (action.payload.add_del == "add") {
        state.lastAtivoId += 1;
        const ativoId = state.lastAtivoId;
        state.ativos[ativoId] = "";
        let newOrder = [...state.ativosOrder];
        newOrder.splice(action.payload.i, 0, ativoId);
        state.ativosOrder = newOrder;
        state.data[ativoId] = {};

        let dateIds = [...state.datesOrder];
        dateIds.forEach((e) => {
          state.data[ativoId][e] = "";
        });
      } else {
        const ativoId = state.ativosOrder[action.payload.i];

        state.ativosOrder.splice(action.payload.i, 1);
        delete state.ativos[ativoId];

        delete state.data[ativoId];
      }
    },

    setCellValue: (state, action) => {
      //   console.log(state.dados);
      if (
        typeof state.data[action.payload.ativoId][action.payload.dateId] !==
        "undefined"
      ) {
        state.data[action.payload.ativoId][action.payload.dateId] =
          action.payload.value;
      } else {
        console.log(state.dados);
      }
    },

    setDateValue: (state, action) => {
      console.log(action.payload)
      if (typeof state.dates[action.payload.dateId] != "undefined") {
        state.dates[action.payload.dateId] = action.payload.value;
      }
    },

    setAtivoValue: (state, action) => {
      if (typeof state.ativos[action.payload.ativoId] != "undefined") {
        state.ativos[action.payload.ativoId] = action.payload.value;
      }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  addDelColumn,
  addDelRow,
  setCellValue,
  setAtivoValue,
  setDateValue,
} = tabelaSlice.actions;

export const selectDates = (state) => state.tabela.dates;
export const selectAtivos = (state) => state.tabela.ativos;
export const selectDatesOrder = (state) => state.tabela.datesOrder;
export const selectAtivosOrder = (state) => state.tabela.ativosOrder;
export const selectData = (state) => state.tabela.data;

export default tabelaSlice.reducer;
