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
    TouchableOpacity
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
        let screenWidth = window.width - 2;
        let picWidth = screenWidth - 2 * rowPadding;
        let picHeight = parseFloat(data.wpic_m_height) * picWidth / parseFloat(data.wpic_m_width);

        let imgSource = {
            uri: 'http://vignette3.wikia.nocookie.net/nintendo/images/d/d9/Mario_%28New_Super_Mario_Bros._2%29.png/revision/latest?cb=20120709145048&path-prefix=en'//data.wpic_large
        }
        return (
            <View style={styles.row}>
                <View style={styles.rowInner}>
                    <Image style={{ width: picWidth, height: picHeight }} source={imgSource}></Image>
                    <View style={{ padding:8, borderTopColor: '#dedede', borderTopWidth:1 }}>
                        { this._renderBody(data.wbody) }
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={ styles.smallButton }>
                                <Text style={ styles.smallButtonText }>赞 {parseInt(data.likes)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ this._gotoComment.bind(this) } style={ styles.smallButton } >
                                <Text style={ styles.smallButtonText }>评论 {data.comments}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _renderBody(bodyStr) {
        if (bodyStr.trim().length > 0) {
            return (
                <Text style={{ marginBottom:10 }}>{ bodyStr.trim() }</Text>
            )
        }
    }

    _gotoComment() {
        if (this.props.onGotoComment) {
            this.props.onGotoComment();
        }
    }
}
const rowPadding = 10;
const styles = StyleSheet.create({
    row: {
        padding:rowPadding,
    },
    rowInner: {
        borderWidth: 1,
        borderColor: '#dedede',
        backgroundColor: '#fff',
    },
    smallButton: {
        borderWidth: 1,
        borderColor: '#dedede',
        minWidth:50,
        padding:3
    },
    smallButtonText: {
        fontSize: 12,
        color: '#777777'
    }
})