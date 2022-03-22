import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateFormatter = (value) => {
    let date = value.split('T')[0].split('-');
    switch (date[1]) {
        case '01':
            return date[2] + ' January ' + date[0];
        case '02':
            return date[2] + ' February ' + date[0];
        case '03':
            return date[2] + ' March ' + date[0];
        case '04':
            return date[2] + ' April ' + date[0];
        case '05':
            return date[2] + ' May ' + date[0];
        case '06':
            return date[2] + ' June ' + date[0];
        case '07':
            return date[2] + ' July ' + date[0];
        case '08':
            return date[2] + ' August ' + date[0];
        case '09':
            return date[2] + ' September ' + date[0];
        case '10':
            return date[2] + ' October ' + date[0];
        case '11':
            return date[2] + ' November ' + date[0];
        case '12':
            return date[0] + ' December ' + date[0];

        default:
            break;
    }

}


const News = () => {

    AsyncStorage.getItem("userData").then((value) => {
        let parseData = JSON.parse(value);
        console.log(parseData);
  
       
      });

    const [news, setNews] = useState('');

    const keyWord = 'farming'

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?' + 'qInTitle=' + keyWord, {
            method: 'GET',
            headers: {
                'x-api-key': '039dbafbe6ac4d06a5b615b8ce0afd14',
            },
        })
            .then((response) => response.json())
            // .then((json) => console.log(json))
            .then((json) => {
                if (json.status === 'ok') {
                    setNews(json.articles)
                }
            })

    }, [])


    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={news}
                keyExtractor={item => item.url}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.urlToImage }}
                            style={styles.articleImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.articleTitle} numberOfLines={2} >
                                {item.title}
                            </Text>
                            <Text style={styles.articleDisc} numberOfLines={2} >
                                {item.description}
                            </Text>
                            <Text style={styles.articleSource}>
                                {'Source: ' + item.source.name}
                            </Text>
                            <Text style={styles.articleDate}>
                                {DateFormatter(item.publishedAt)}
                            </Text>
                            <View style={styles.horizontalLineNews} />
                        </View>
                    </View>
                )}
            />
            {/* <TouchableOpacity>
                <Text style={styles.bottomText}>View More</Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default News

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#F02F39",
        marginBottom: 10,
    },
    horizontalLine: {
        borderBottomColor: "#BFBFBF",
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    horizontalLineNews: {
        borderBottomColor: "#BFBFBF",
        borderBottomWidth: 2,
        marginTop: 5,
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabStyle: {
        height: 40,

    },
    labelStyle: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: 'none',
        height: '100%',
        margin: 0,
        width: '100%',
    },
    indicatorStyle: {
        backgroundColor: "#F02F39",
    },
    articleContainer: {
        backgroundColor: "#fff",
        flex: 1
    },
    itemContainer: {
        // flexDirection: "row",
        // paddingTop: 20,
        // marginVertical:20,
        paddingVertical:20,
        backgroundColor: "white",
        paddingHorizontal:10,
    // alignSelf: "center",

    padding: 1,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 5,
    },
    articleImage: {
        alignSelf: 'center',
        width: '100%',
        height: 180,
    },
    textContainer: {
        marginTop: 10,
        marginLeft: 15,
        flex: 1,
        justifyContent: "space-between",
    },
    articleTitle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    articleDisc: {
        color: "#A2A2A2",
        fontSize: 12,
    },
    articleSource: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
    },
    articleDate: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
    },
    bottomText: {
        color: '#F02F39',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginTop: 20
    },
    bottomLine: {
        borderBottomColor: "#BFBFBF",
        borderBottomWidth: 2,
        marginTop: 10,
    }
});
