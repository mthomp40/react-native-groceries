import Firestack from 'react-native-firestack';
import {addItemLocally, removeItemLocally, goOnline, goOffline} from './actions/items'

import config from '../config'

const firestack = new Firestack({
    debug: true
});
firestack.database.setPersistence(true)
export const itemsRef = firestack.database.ref('items')
const connectedRef = firestack.database.ref('.info/connected')

export function syncFirebase(store) {
    itemsRef.on('database_event', (snapshot) => {
        console.log('database_event', snapshot.val());
        //store.dispatch(updateItemList(snapshot.val()))
    })

    itemsRef.on('child_added', (snapshot) => {
        console.log(snapshot.val());
        //store.dispatch(addItemLocally(snapshot.val()))
    })

    itemsRef.on('child_removed', (snapshot) => {
        console.log(snapshot.val());
        //store.dispatch(removeItemLocally(snapshot.val().id))
    })

    connectedRef.on('value', snap => {
        if (snap.val() === true) {
            store.dispatch(goOnline())
        } else {
            store.dispatch(goOffline())
        }
    })
}
