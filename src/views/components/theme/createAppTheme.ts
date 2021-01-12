import {createMuiTheme, Theme, ThemeOptions} from "@material-ui/core";
import {defaultAppThemeValues} from "./defaultAppThemeValues";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        app: {
            colors: {
                main: {
                    green: string,
                    blue: string,
                }
            },
        }
    }

    interface ThemeOptions {
        app: {
            colors: {
                main: {
                    green: string,
                    blue: string,
                }
            }
        }
    }
}

export default function createAppTheme(options: ThemeOptions) : Theme {
    return createMuiTheme({
        ...options,
        ...defaultAppThemeValues
    })
}
