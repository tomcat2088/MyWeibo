/**
 * Created by ocean on 2017/3/28.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    StyleSheet,
    AppRegistry
} from 'react-native'

export default class ImagePresenter extends Component {
    render() {
        return (
            <Text>ImagePresenter</Text>
        )
    }
}

AppRegistry.registerComponent('ImagePresenter', () => ImagePresenter);