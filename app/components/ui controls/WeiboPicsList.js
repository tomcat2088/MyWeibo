/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'

import {
    ListView,
    Text,
    Image,
View
} from 'react-native'

const window = require('Dimensions').get('window');

export default class WeiboPicsList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            rows: ['asdasda'],
            dataSource: ds.cloneWithRows(['asdasda'])
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rows) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({ dataSource: ds.cloneWithRows(nextProps.rows) });
        }
    }

    render() {
        return (
            <ListView dataSource={this.state.dataSource} renderRow={(data) => this._renderRow(data)} >
            </ListView>
        )
    }

    _renderRow(data) {
        let screenWidth = window.width;
        let picWidth = parseFloat(data.wpic_m_width);
        let picHeight = parseFloat(data.wpic_m_height) * screenWidth / picWidth;

        let imgSource = {
            uri: data.wpic_large
        }
        return (
            <View>
                <Image style={{ width: screenWidth, height: picHeight }} source={imgSource}></Image>
                <Text>{window.height}</Text>
            </View>
        )
    }
}