import { commonSizes, drawerSizes } from "./sizes";

export const alignItemCenter = `
  display: -ms-inline-flex;
  display: -webkit-inline-flex;
  display: inline-flex;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -ms-flex-line-pack: center;
  -webkit-align-content: center;
  align-content: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
`;

export const mainContainer = `
  position: relative;
  width: 100%;
  margin: 0 auto 0 auto;
`;

export const flexContainer = `
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  justify-content: flex-start;
`;

export const contentApp = `
  width: calc(100% - ${drawerSizes.width} - ${commonSizes.containerMargin})
  margin: ${commonSizes.containerMargin} ${commonSizes.containerMargin} ${
  commonSizes.containerMargin
} 0
`;

export default alignItemCenter;
