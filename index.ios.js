/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation'

import HomePage from './app/pages/HomePage'
import CommentPage from './app/pages/CommentPage'

const App = StackNavigator({
    Main: {
        screen: HomePage
    },
    Comment: {
        screen: CommentPage
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    image: {
        width:200,
        height:100,
        borderColor: '#900',
        borderWidth: 2,
    }
});

AppRegistry.registerComponent('MyWeibo', () => App);
