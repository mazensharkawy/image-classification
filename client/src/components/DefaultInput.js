import styled from "styled-components";
import { LARGE_SCREEN_BREAK_POINT, MOBILE_BREAK_POINT } from "../config";

export default styled.input`
  border-radius: 5px;
  width: 100%;
  height: 3vw;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  padding: 0.5vw 1.6vw;
  font-size: 1vw;
  color: #717171;
  border: none;
  border: ${({ error }) => (error ? "1px solid #ececec" : "1px solid red")};
  background: ${({ error }) => (error ? "#ffcccb" : "white")};
  @media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    height: 9vw;
    font-size: unset;
  }
  @media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
    padding: 9px 30px;
    border-radius: 7px;
    font-size: 20px;
    height: 60px;
  }
`;
