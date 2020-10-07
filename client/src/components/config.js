import styled from "styled-components";

const ENVIRONMENT = "DEVELOPMENT";

let url = "https://leasing.deals";

if (ENVIRONMENT === "DEVELOPMENT") {
  url = "http://localhost:3000";
} else if (ENVIRONMENT === "STAGING") {
  url = "https://staging.leasing.deals";
}

export const URL = url;
export const env = ENVIRONMENT;
export const MOBILE_BREAK_POINT_NUM = 600;
export const MOBILE_BREAK_POINT = `${MOBILE_BREAK_POINT_NUM}px`;
export const TABLET_BREAK_POINT = "1024px";
export const TABLET_CONDITION = `(max-width: ${TABLET_BREAK_POINT}) and (min-width: ${MOBILE_BREAK_POINT})`;
export const LARGE_SCREEN_BREAK_POINT = "1900px";
export const NORMAL_SCREEN_WIDTH = "90vw";
export const LARGE_SCREEN_WIDTH = "1728px";
export const PURPLE = "#604cd5";
export const LIGHT_GREY = "#e0e0e0";

export const DIV_FLEX = styled.div`
  display: flex;
  align-items: center;
`;
export const DIV_FLEX_SPACE_BETWEEN = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const DIV_FLEX_CENTER = styled.div`
  display: flex;
  justify-content: center;
`;
