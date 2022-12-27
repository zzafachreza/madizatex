import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import Pdf from 'react-native-pdf';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';



export default function SHasil({ navigation, route }) {
    const item = route.params;
    console.log(item);


    return (
        <View style={styles.container}>

            <View style={{
                height: 80,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 20
                }}>{item.keterangan}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.white,
                    fontSize: 20
                }}>{item.tanggal}</Text>
            </View>

            <View style={{
                flex: 1,
            }}>
                <Image source={{
                    uri: item.image
                }} style={{
                    width: windowWidth,
                    resizeMode: 'contain',
                    height: '100%',
                }} />


            </View>
            <Text style={{

                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                padding: 30,
                fontSize: windowWidth / 20,
                color: colors.black,
            }}>Rp. {new Intl.NumberFormat().format(item.total_bayar)}</Text>

            <Text style={{

                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.primary,
                padding: 30,
                color: colors.white,
            }}>{item.tipe}</Text>
            <TouchableOpacity onPress={() => {
                Alert.alert('Catatan Piutang', 'Apakah kamu yakin akan hapus ini ?', [
                    {
                        style: 'cancel',
                        text: 'Batal'
                    },
                    {
                        style: 'default',
                        text: 'Hapus',
                        onPress: () => {

                            console.log(item)
                            axios.post(apiURL + 'delete_detail.php', {
                                id_bayar: item.id,
                                kode: item.kode,
                                total_bayar: item.total_bayar,
                                jenis: item.jenis
                            }).then(res => {
                                console.log(res.data)
                                navigation.goBack();
                            })
                        }
                    }
                ])
            }} style={{
                padding: 10,
                backgroundColor: colors.danger
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    textAlign: 'center'
                }}>Hapus</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});