import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text
} from 'react-native'
import {Provider} from 'react-redux'
import App from './src/containers/App'
import {firestackDb} from './src/firestack'
import configureStore from './src/store/configureStore'

class Groceries extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({store: configureStore(() => this.setState({isLoading: false}))});
    }

    render() {
        if (this.state.isLoading) {
            return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'red', fontSize: 36}}>Loading...</Text>
            </View>
        } else {
            return (
                <Provider store={this.state.store}>
                    <App />
                </Provider>
            )
        }
    }
}

AppRegistry.registerComponent('Groceries', () => Groceries)
