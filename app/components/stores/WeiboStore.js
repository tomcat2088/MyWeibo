/**
 * Created by ocean on 2017/3/28.
 */
import React, {Component} from 'react'
import 'react-native'

var stringformat = require('stringformat');

const BaseUrl = 'http://120.55.151.67/weibofun/weibo_list.php'
const WeiboListUrl = 'http://120.55.151.67/weibofun/weibo_list.php?apiver=20201&category=weibo_pics&page=0&page_size=30';
const ConstSuffix = 'latest_viewed_ts=1490682600&platform=iphone&appver=2.2.2&buildver=2020203&udid=F795A776-18F6-4FF9-AF3C-303DB0A3DC08&sysver=10.2.1&wf_uid=56743912'

type WeiboStoreParam = {
    apiVersion: Number,
    category: string,
}

class WeiboStore {
    constructor() {
        this.apiVersion = 20201;
        this.Category_PICS = 'weibo_pics'
    }

    fetchWeiboPics(timestamp: number, pageSize: number) {
        return fetch(this._picsUrl(timestamp, pageSize))
            .then( (response) => response.json() );
    }

    _picsUrl(timestamp: number, pageSize: number) {
        return stringformat("{0}?apiver={1}&category={2}&max_timestamp={3}&page_size={4}&page=0&{5}", BaseUrl, this.apiVersion, this.Category_PICS, timestamp, pageSize, ConstSuffix);
    }
}

module.exports = WeiboStore;