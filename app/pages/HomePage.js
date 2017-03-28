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
var WeiboStore = require('../components/stores/WeiboStore')

var ViewPager = require('react-native-viewpager')

export default class HomePage extends Component {
    static navigationOptions = {
        title: '首页'
    };
    static weiboStore = new WeiboStore();

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            rows: [],
            banners: [
                'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
                'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
                'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
                'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
                'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
                'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
                'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
            ],
            listDataSource: ds.cloneWithRows([])
        }
    }
    componentDidMount() {
        HomePage.weiboStore.fetchWeiboPics(0, 30).then( (responseJson) => {
           this.setState({ rows: responseJson.items });
        });
    }
    render() {
        const {navigate} = this.props.navigation;
        let ds = new ViewPager.DataSource({
            pageHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource = ds.cloneWithPages(this.state.banners);
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.pager} >
                    <ViewPager dataSource={dataSource} renderPage={this._renderPage} autoPlay={true} isLoop={true} ></ViewPager>
                </View>
                <WeiboPicsList rows={ this.state.rows }></WeiboPicsList>
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