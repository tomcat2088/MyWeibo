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
    ActivityIndicator
} from 'react-native'

import RefreshLoadMoreListView from './RefreshLoadMoreListView'


var WeiboStore = require('../../components/stores/WeiboStore')
const window = require('Dimensions').get('window')

export default class WeiboPicsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimeStamp: -1,
            pageSize: 4,
        };
    }

    _loadMore() {
        var weiboStore: WeiboStore = this.props.weiboStore;
        return weiboStore.fetchWeiboPics(this.state.currentTimeStamp, this.state.pageSize).then((reponseJson) => {
            this.setState({currentTimeStamp: reponseJson.items[reponseJson.items.length - 1].update_time});
            return reponseJson.items
        });
    }

    _onRefresh() {
        this.state.currentTimeStamp = -1;
        var weiboStore: WeiboStore = this.props.weiboStore;
        return weiboStore.fetchWeiboPics(this.state.currentTimeStamp, this.state.pageSize).then((reponseJson) => {
            this.setState({currentTimeStamp: reponseJson.items[reponseJson.items.length - 1].update_time});
            return reponseJson.items
        });
    }

    render() {
        return (
            <RefreshLoadMoreListView
                onLoadMore={this._loadMore.bind(this)}
                onRefresh={this._onRefresh.bind(this)}
                renderRow={(data) => this._renderRow(data)}>
            </RefreshLoadMoreListView>
        )
    }

    _renderRow(data) {
        let screenWidth = window.width;
        let picWidth = screenWidth - 2 * rowPadding;
        let picHeight = parseFloat(data.wpic_m_height) * picWidth / parseFloat(data.wpic_m_width);

        let imgSource = {
            uri: ''//data.wpic_large
        }
        return (
            <View style={styles.row}>
                <View style={styles.rowInner}>
                    <Image style={{ width: picWidth, height: picHeight, backgroundColor: "#ddd" }} source={imgSource}></Image>
                    <Text style={{ paddingTop:10, paddingBottom:10 }}>{data.wbody}</Text>
                </View>
            </View>
        )
    }
}
const rowPadding = 10;
const styles = StyleSheet.create({
    row: {
        padding:rowPadding,
    },
    rowInner: {
        borderWidth: 1,
        borderColor: '#dedede'
    },
    loadMore: {

    }
})