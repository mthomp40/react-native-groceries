import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Groceries from '../components/Groceries'
import * as ItemsActions from '../actions/items'
import {itemsRef} from '../firestack';

function mapStateToProps(state) {
    console.log('itemsRef', itemsRef)
    let list = [];
    itemsRef.then(snapshot => {
        list = Object.keys(snapshot.val()).map(i => snapshot.val()[i])
    })
    return {
        //onlineItems: state.items.onlineList,
        onlineItems: list,
        offlineItems: state.items.offlineList,
        connectionChecked: state.items.connectionChecked,
        connected: state.items.connected
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ItemsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groceries)
