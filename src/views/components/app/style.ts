import styled from "styled-components";
import {Grid, Paper, Theme} from "@material-ui/core";
import {ThemeColors} from "../theme/ThemeColors";
import {themeColor} from "../theme/themeAccessors";

export const Root = styled.div<Theme>`
  background: ${themeColor(ThemeColors.green)};
  min-height: 100vh;
  flex-grow: 1;
  padding: 24px;
`

export const RootGrid = styled(Grid)`
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export const SectionGrid = styled(Grid)`
  align-content: center;
`
export const RootPaper = styled(Paper)`
  padding: 16px;
  text-align: center;
  vertical-align: middle;
  color: ${themeColor(ThemeColors.blue)};
  height: 390px;
`

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`