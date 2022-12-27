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
import { Linking } from 'react-native';

export default function TimDetail({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <Text style={{
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 28,
                textAlign: 'center'
            }}>
                Info Shalat Jum'at
            </Text>
            <Text style={{
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 28,
                textAlign: 'center'
            }}>
                Masjid Agung Baitul Makmur Meulaboh
            </Text>
            <Image source={{
                uri: item.image
            }} style={{
                marginTop: 10,
                borderRadius: 10,
                height: 200,
                width: windowWidth / 3,
                resizeMode: 'contain',
                alignSelf: 'center'
            }} />
            <Text style={{
                color: colors.black,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 28,
                marginTop: 20,
            }}>
                Jumat, {item.tanggal}
            </Text>

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.5,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    Khatib
                </Text>
                <Text style={{
                    flex: 0.2,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    :
                </Text>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>{item.khatib}</Text>
            </View>

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.5,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    Imam
                </Text>
                <Text style={{
                    flex: 0.2,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    :
                </Text>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>{item.imam}</Text>
            </View>

            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.5,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    Qari
                </Text>
                <Text style={{
                    flex: 0.2,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    :
                </Text>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>{item.qari}</Text>
            </View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.5,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    Muazzin
                </Text>
                <Text style={{
                    flex: 0.2,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>
                    :
                </Text>
                <Text style={{
                    flex: 1,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,

                }}>{item.muazzin}</Text>
            </View>

            <Text style={{
                marginTop: 20,
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 28,
            }}>
                Live di Radio RRI Meulaboh

            </Text>


            <Text style={{
                marginTop: 20,
                color: colors.black,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 32,
            }}>
                ‌Ikuti info seputar Masjid Agung di instagram
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/masjidagung.official/')}><Text style={{
                backgroundColor: colors.primary,
                marginTop: 10,
                marginHorizontal: windowWidth / 4.5,
                padding: 5,
                textAlign: 'center',
                borderRadius: 10,
                color: colors.white,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 26,
            }}>@masjidagung.official</Text></TouchableOpacity>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})