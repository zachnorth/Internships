import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as RequestsStore from "./requests";
import * as AppStore from "./AppStore";
import { createLogger } from "redux-logger";
import { persistReducer } from "redux-persist";
// import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectRouter } from "connected-react-router";

export default function configureStore(history, initialState) {

	const tempConfig = {
		key: "tempConfig",
		storage: storage
	};

	const reducers = {
		requests: RequestsStore.reducer,
		app: AppStore.reducer,
	};

	// const logger = createLogger({
	// 	collapsed: true,
	// 	duration: true,
	// 	timestamp: true
	// });

	let middleware = [thunk, routerMiddleware(history)];

	let enhancers = [];
	
	const rootReducer = combineReducers({
		...reducers,
		routing: routerReducer,
		router: connectRouter(history)
	});

	return createStore(
		persistReducer(tempConfig, rootReducer),
		initialState,
		compose(
			applyMiddleware(...middleware),
			...enhancers
		)
	);
}