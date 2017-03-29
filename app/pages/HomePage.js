/**
 * Created by ocean on 2017/3/28.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    StyleSheet,
    AppRegistry,
    Button,
    Image,
    TouchableWithoutFeedback,
    ListView
} from 'react-native'

import WeiboPicsList from '../components/ui controls/WeiboPicsList'
import WeiboBanner from '../components/ui controls/WeiboBanner'

var WeiboStore = require('../components/stores/WeiboStore')
export default class HomePage extends Component {
    static navigationOptions = {
        title: '首页',
    };
    constructor(props) {
        super(props);
        this.state = {
            banners: [
                'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
                'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
                'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
                'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
                'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
                'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
                'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
            ]
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                {/*<WeiboBanner images={this.state.banners} autoPlay={true} isLoop={true}></WeiboBanner>*/}
                <WeiboPicsList
                    rows={ this.state.rows }
                    weiboStore={new WeiboStore()}></WeiboPicsList>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})