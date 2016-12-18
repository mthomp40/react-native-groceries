import offline from 'react-native-simple-store'
import {itemsRef} from '../firestack'

export const UPDATE_ITEMLIST = 'UPDATE_ITEMLIST';
export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
export const OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED'
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING'
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'

export function updateItemList(itemList) {
    return {
        type: UPDATE_ITEMLIST,
        itemList: itemList
    }
}

export function addItem(title) {
    return dispatch => {
        const id = Math.random().toString(36).substring(7)
        const itemRef = itemsRef.child(id)
        const itemData = {
            id,
            title: title,
            time: new Date().getTime()
        }
        itemRef.set(itemData)

        // return {
        //     type: ADD_ITEM_SUCCESS,
        //     itemData: itemData
        // }
    }
}

export function removeItem(id) {
    return dispatch => {
        itemsRef.child(id).remove()

        // return {
        //     type: REMOVE_ITEM_SUCCESS,
        //     id: id
        // }
    }
}

export function addItemLocally(itemData) {
    return {
        type: ADD_ITEM_SUCCESS,
        itemData: itemData
    }
}

export function removeItemLocally(id) {
    return {
        type: REMOVE_ITEM_SUCCESS,
        id: id
    }
}

function offlineItemsLoaded(items) {
    return {
        type: OFFLINE_ITEMS_LOADED,
        items: items
    }
}

export function loadOfflineItems() {
    return dispatch => {
        offline.get('items').then(items => {
            dispatch(offlineItemsLoaded(items || []))
        })
    }
}

export function checkConnection() {
    return dispatch => {
        dispatch({type: CONNECTION_CHECKING})
        setTimeout(() => dispatch({type: CONNECTION_CHECKED}), 5000)
    }
}

export function goOnline() {
    return {
        type: CONNECTION_ONLINE
    }
}

export function goOffline() {
    return {
        type: CONNECTION_OFFLINE
    }
}
