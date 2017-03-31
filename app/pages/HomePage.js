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

import SegmentedControlTab from 'react-native-segmented-control-tab'
import HideableView from 'react-native-hideable-view';

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
            picsStore: new WeiboStore(WeiboStore.CategoryPics),
            girlsStore: new WeiboStore(WeiboStore.CategoryGirls),
            selectedTabIndex: 0,
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SegmentedControlTab
                    tabsContainerStyle={ styles.segmentBar }
                    values={['趣图', 'Girls']}
                    onTabPress= {index => {
                        this.setState( { selectedTabIndex: index } );
                        this.forceUpdate();
                    } }
                />
                <View>
                    <View style={{ backgroundColor:'#300' }}></View>
                    <View style={{ backgroundColor:'#330' }}></View>
                    {/*<HideableView visible={ this.state.selectedTabIndex == 0 } style={{ position: 'relative' }}>*/}
                        {/*<WeiboPicsList*/}
                            {/*weiboStore={ this.state.picsStore }*/}
                            {/*onGotoComment={ this._onGotoComment.bind(this) }></WeiboPicsList>*/}
                    {/*</HideableView>*/}
                    {/*<HideableView visible={ this.state.selectedTabIndex == 1 } style={{ position: 'relative'}}>*/}
                        {/*<WeiboPicsList*/}
                            {/*weiboStore={ this.state.girlsStore }*/}
                            {/*onGotoComment={ this._onGotoComment.bind(this) }></WeiboPicsList>*/}
                    {/*</HideableView>*/}
                </View>
            </View>
        )
    }

    _onGotoComment() {
        const { navigate } = this.props.navigation;
        navigate('Comment', { comment: '2' });
    }

    _selectTab(tabIndex) {
        console.warn(tabIndex);
        if (tabIndex == 0) {
            return (
                <WeiboPicsList
                    weiboStore={ this.state.picsStore }
                    onGotoComment={ this._onGotoComment.bind(this) }></WeiboPicsList>
            )
        } else if (tabIndex == 1) {
            return (

            <Text>Hello</Text>
                    )
        }
    }
}

const styles = StyleSheet.create({
    segmentBar: {
        marginLeft:10,
        marginRight:10,
        marginTop: 5
    }
})