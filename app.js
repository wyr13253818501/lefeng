import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute} from "react-router";



import "./scss/main.scss";



import App from "./md/App.js";

import Home from "./md/Home.js";
import Search from "./md/Search.js";
import User from "./md/User.js";
import Cart from "./md/Cart.js";
import List from "./md/List.js";
import Login from "./md/Login.js";
import Detail from "./md/Detail.js";
import Register from "./md/Register.js";
import DoubleList from "./md/DoubleList.js";
import Account from "./md/Account.js";
import Adress from "./md/Adress.js";
ReactDOM.render((
	<Router history = {hashHistory}>
		<Route	path = "/" component = {App}>
			<IndexRoute components = {{type:Home}} />
			<Route path = "search" components = {{type:Search}}/>
			<Route path = "cart" components = {{type:Cart}}/>
			<Route path = "user" components = {{type:User}}/>
			<Route path = "list" components = {{type:List}}/>
			<Route path = "login" components = {{type:Login}}/>
			<Route path = "register" components = {{type:Register}}/>
			<Route path = "detail" components = {{type:Detail}}/>
			<Route path = "doubleList" components = {{type:DoubleList}}/>
			<Route path = "account" components = {{type:Account}}/>
			<Route path = "adress" components = {{type:Adress}}/>
		</Route>
	</Router>
),document.getElementById("app"));

