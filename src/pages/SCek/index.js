import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData, webUrl } from '../../utils/localStorage';
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
export default function SCek({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);

    const ref = useRef();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getDataTransaction();
        }

    }, [isFocused]);



    const getDataTransaction = () => {
        getData('user').then(u => {
            axios.post(webUrl + 'v1/get_riwayat').then(res => {
                console.log(res.data);
                setData(res.data);
            })
        })
    }



    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(i => {
                    return (
                        <View style={{
                            padding: 10,
                            margin: 5,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: colors.border,
                        }} >
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 38,
                                        color: colors.primary,
                                    }}>{i.tanggal} {i.jam}</Text>
                                </View>

                                <View style={{

                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 30,
                                        color: colors.black,
                                    }}>{i.kode}</Text>

                                </View>
                            </View>


                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Status</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.status}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Kuantitas</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.kuantitas}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Jenis</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.jenis}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Macam</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.macam}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Ekspedisi</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.ekspedisi}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 0.4,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>Distributor</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>{i.distributor}</Text>
                            </View>

                        </View>
                    )
                })}
            </ScrollView>


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})