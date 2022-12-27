import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

export default function TimList({ navigation }) {
    const [data, setData] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();

        }

    }, [isFocused]);


    const __getTransaction = () => {
        axios.post(apiURL + 'khutbah_data.php').then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }



    const __getTransactionKey = (x) => {
        axios.post(apiURL + 'khutbah_data.php', {
            key: x
        }).then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }



    const __renderItem = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                marginVertical: 5,
                flex: 1,
                backgroundColor: colors.white,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                flexDirection: 'row'
            }}>
                <View style={{
                    paddingRight: 5,
                }}>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        height: 60,
                        borderRadius: 10,
                        width: 50,
                    }} />
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Jumat, {item.tanggal}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Khatib :  {item.khatib}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                    }}>Imam :  {item.imam}</Text>
                </View>



                <TouchableOpacity onPress={() => navigation.navigate('TimDetail', item)} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 5,
                    backgroundColor: colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    flexDirection: 'row'
                }}>
                    <Icon type='ionicon' name='search' color={colors.white} size={15} />
                    <Text style={{
                        left: 5,
                        color: colors.white,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 28,
                    }}>Lihat</Text>

                </TouchableOpacity>


            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})