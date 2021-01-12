import styled from "styled-components";
import {Grid} from "@material-ui/core";

export const VideoEventsLayerContainer = styled(Grid)`
  height: 360px;
  width: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0
`

export const StyledCanvas = styled.canvas`
  height: 100%;
  width: 100%;
  outline: none;
  display: block;
  margin: 0;
  padding: 0;
  touch-action: none;
`