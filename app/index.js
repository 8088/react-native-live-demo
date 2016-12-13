/**
 * TestLive React Native App
 *
 * @flow
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    AppState,
    StyleSheet,
    Navigator,
    UIManager,
    StatusBar,
    View,
    AsyncStorage,
    NetInfo,
    BackAndroid,
    Alert,
    Platform,
} from 'react-native';

import Colors from './assets/Colors';

//详情页
import LivePage from './containers/LivePage';


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

global.LEVEL_COLOR = [
    '#bfbdbd', '#fcc62e', '#f7a842', '#f98d26', '#f57a40', '#e94f28', '#e83627', '#d90f5c',
];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' hidden={true} animated={true} translucent={true} barStyle='default'/>
                <Navigator
                    initialRoute={{id:'Live', title:'直播互动测试'}}
                    configureScene={this._configureScene}
                    renderScene={this._navToPage}
                    style={styles.container}
                />
            </View>
        );
    }

    _configureScene = (route, routeStack) => {
        if (route.configureScene) return route.configureScene;
        else return Navigator.SceneConfigs.PushFromRight;
    }

    _navToPage = (route, navigator) => {
        let Component = route.component;
        this.navigator = navigator;
        if (Component) return <Component {...route} navigator={navigator} />;

        switch (route.id) {
            case 'Live':
                return <LivePage {...route} navigator={navigator} />;
            default:
                return <ErrorPage {...route} navigator={navigator} />;
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    cover: {

    },
});
