import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createAppTheme from "./createAppTheme";
import {defaultAppThemeValues} from "./defaultAppThemeValues";

const theme: Theme = createAppTheme({
    ...defaultAppThemeValues
})
export default theme;