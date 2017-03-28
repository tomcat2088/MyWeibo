/**
 * Created by ocean on 2017/3/28.
 */
import 'react-native';
import React from 'react';
import WeiboStore from '../app/components/stores/WeiboStore'



it('fetch weibo list success', () => {
    let weiboStore = new WeiboStore();
    weiboStore.fetchWeiboPics(0, 30).then( (responseJson) => {
        console.log(JSON.stringify(responseJson))
    } )
});