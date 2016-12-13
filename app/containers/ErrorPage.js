import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Topbar from '../modules/Topbar';


export default class ErrorPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Topbar {...this.props} color='#000000' backgroundColor='white'/>
                <View style={styles.page}>
                    <Text style={styles.txt}>404!</Text>
                    <Text>"{this.props.title}" 页面待开发..</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 50,
        textAlign: 'center',
        color: '#666'
    }
});
