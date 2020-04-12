import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: "JS Hunt"
    };

    state = {
        productInfo: {},
        docs: [],
        page: 1,
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ... productInfo } = response.data;
        this.setState({ 
            docs: [ ... this.state.docs, ... docs ], 
            productInfo,
            page
         });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    };

    renderItem = ({ item }) => (
        <View style={styles.productsContainer}>
            <Text style={styles.productsTitle}>{item.title}</Text>
            <Text style={styles.productsDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productsButton} 
                onPress={() => { 
                    this.props.navigation.navigate("Product", { product: item }); 
                }}
            >
                <Text style={styles.productsButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return(
            <View style={StyleSheet.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data = { this.state.docs }
                    keyExtractor = { item => item._id }
                    renderItem = { this.renderItem }
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding: 20
    },
    productsContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },
    productsDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    productsButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552f",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    productsButtonText: {
        fontSize: 16,
        color: "#DA522f",
        fontWeight: "bold"
    }
})