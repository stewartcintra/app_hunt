import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: "JS Hunt"
    };

    state = {
        docs: [],
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');

        const { docs } = response.data;

        this.setState({ docs });
    };

    render() {
        return(
            <View>
                <Text>Pagina Main { this.state.counter } </Text>
                {this.state.docs.map( products => {
                    return <Text key={ products._id }>{ products.title }</Text>
                })}
            </View>
        );
    }
}