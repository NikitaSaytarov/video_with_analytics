import styled from "styled-components";
import {Grid, Link} from "@material-ui/core";
import React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

export const EventsPanel = styled.div`
  margin: 12px;
`

export const EventLink = styled(Link)`
  cursor: pointer;
`

export const EventFetchErrorContainer = styled.div<{theme: Theme, isActive: number}>`
  cursor: pointer;
  visibility: ${props => props.isActive ? `visible` : `hidden`};
`
