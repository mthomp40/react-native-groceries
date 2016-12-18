import {persistStore, autoRehydrate} from 'redux-persist'
import {createStore, applyMiddleware, compose} from 'redux'
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk'
import reducer from '../reducers'
//import syncOffline from './syncOffline'
import {syncFirebase} from '../firestack'

export default function configureStore(onComplete: ? () => void) {
    const store = compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )(createStore)(reducer);
    persistStore(store, {storage: AsyncStorage}, () => {
        syncFirebase(store)
        onComplete()
    })//.purge()
    //syncOffline(store)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store
}