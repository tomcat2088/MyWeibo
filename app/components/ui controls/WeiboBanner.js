/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'

import {
    StyleSheet,
    ListView,
    Text,
    Image,
    View,
    RefreshControl,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native'

import ViewPager from 'react-native-viewpager'

export default class WeiboBanner extends Component {
    constructor(props) {
        super(props);
        let ds = new ViewPager.DataSource({
            pageHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            currentTimeStamp: -1,
            pageSize: 4,
            dataSource: ds.cloneWithPages([])
        };
        this._updateProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this._updateProps(nextProps);
    }

    _updateProps(props) {
        if (props.images) {
            let ds = new ViewPager.DataSource({
                pageHasChanged: (r1, r2) => r1 !== r2
            });
            this.state.dataSource = ds.cloneWithPages(props.images);
        }
    }

    render() {
        return (
            <View style={styles.pager} >
                <ViewPager dataSource={this.state.dataSource} renderPage={this._renderPage} autoPlay={this.props.autoPlay} isLoop={this.props.isLoop} ></ViewPager>
            </View>
        )
    }

    _renderPage(data, pageID) {
        let src = {
            uri: data
        }
        return (
            <TouchableWithoutFeedback onPress={ () => { console.warn(pageID) } }>
                <View style={ styles.container }>
                    <Image source={src} style={ styles.image }></Image>
                </View>
            </TouchableWithoutFeedback>

        )
    }
}


var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    image: {
        width: width,
        height: width / 16 * 7
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pager: {
        height: width / 16 * 7
    }
})