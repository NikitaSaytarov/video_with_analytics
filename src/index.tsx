import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from "./views/components/app";
import {GlobalStyle} from "./globalStyle";
import {CssBaseline} from "@material-ui/core";
import Theme from "./views/components/theme";
import {Provider} from "react-redux";
import {store} from "./store/store";

ReactDOM.render(
    <Provider store={store}>
            <GlobalStyle/>
            <CssBaseline/>
            <Theme>
                <Suspense fallback="">
                    <App/>
                </Suspense>
            </Theme>
    </Provider>,
    document.getElementById('root')
);