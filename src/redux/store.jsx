import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import elevatorReducer from "./reducers/elevatorReducer";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create store
const persistedReducer = persistReducer(persistConfig, elevatorReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
