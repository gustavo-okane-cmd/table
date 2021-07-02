import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import {
  Container,
} from "@material-ui/core";

import TabelaDados from '../Components/TableData'

// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import styled from "styled-components";


const Index = () => {
  //   const key = useRef(null);
  //   const [word, setWord] = useState("");
  //   const focusText = (id, name) => {
  //     setWord(name);
  //   };


  return (
    <Container>
      {/* <TextField style={{ width: "100%" }} /> */}
      <TabelaDados/>
    </Container>
  );
};
export default Index;

// }

// export const getServerSideProps = async (ctx) => {
//     // const res = await fetch('https://.../data')
//     // const data = await res.json()
//     try {
//         const { query } = ctx;
//         // const ativos = query?.ativos;
//         // const response = await get_nomes(["PETR4", "09326708000101", "BOVA11"]);
//         const response = await get_nomes(query.ativos.split(" "));

//         console.log(response);

//         return {
//             props: {
//                 nomes_ativos: response.data,
//                 server_side: { success: true },
//             },
//         };
//     } catch (error) {
//         return {
//             props: {
//                 passou: false,
//             },
//         };
//     }
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//     async ({ ctx }) => {
//         // const res = await fetch('https://.../data')
//         // const data = await res.json()
//         try {
//             const dispatch = useDispatch();
//             const { query } = ctx;
//             // console.log(query);
//             if (typeof query.ativos !== undefined) {
//                 // const response = await get_nomes([
//                 //     "PETR4",
//                 //     "09326708000101",
//                 //     "BOVA11",
//                 // ]);
//                 const response = await get_nomes(query.split(" "));
//             }

//             return {
//                 props: {
//                     nomes_ativos: response.data ?? null,
//                     teste: query,
//                 },
//             };
//         } catch (error) {
//             return {
//                 props: {},
//             };
//         }
//     }
// );
