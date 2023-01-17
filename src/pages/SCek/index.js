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
import { BluetoothEscposPrinter, BluetoothManager } from 'react-native-bluetooth-escpos-printer';

export default function SCek({ navigation, route }) {

    const [paired, setPaired] = useState({});

    const item = route.params;
    const [data, setData] = useState([]);

    const ref = useRef();

    const isFocused = useIsFocused();

    const printData = async (kirim) => {

        console.log(kirim);


        BluetoothManager.connect(paired.inner_mac_address)
            .then(async (s) => {
                console.log(s);
                let columnWidths = [14, 2, 16];
                try {


                    // await BluetoothEscposPrinter.printPic(logoCetak, { width: 250, left: 150 });
                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                    await BluetoothEscposPrinter.printColumn(
                        columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                        [`Status`, ':', `${kirim.status}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});

                    await BluetoothEscposPrinter.printColumn(
                        columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                        [`Kode Produksi`, ':', `${kirim.kode}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printColumn(
                        columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                        [`Tanggal`, ':', `${kirim.tanggal}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printColumn(
                        columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                        [`Jenis`, ':', `${kirim.jenis}`],
                        {},
                    );
                    await BluetoothEscposPrinter.printColumn(
                        columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                        [`Ket`, ':', `${kirim.keterangan}`],
                        {},
                    );
                    if (kirim.status == "DISTRIBUSI") {
                        await BluetoothEscposPrinter.printColumn(
                            columnWidths,
                            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                            [`Ekspedisi`, ':', `${kirim.kurir}`],
                            {},
                        );
                    } else {
                        await BluetoothEscposPrinter.printQRCode(
                            `${kirim.kode}`,
                            280,
                            BluetoothEscposPrinter.ERROR_CORRECTION.L,
                        );
                    }
                    await BluetoothEscposPrinter.printText('\r\n\r\n', {});
                } catch (e) {
                    alert(e.message || 'ERROR');
                }



            }, (e) => {

                alert(e);
            })



    }

    useEffect(() => {

        getData('paired').then(res => {
            if (!res) {
                Alert.alert('MazidaTex', 'Harap hubungkan printer kamu !')
            } else {
                console.log(res);
                setPaired(res);
            }
        })



        if (isFocused) {
            getDataTransaction();
        }

    }, [isFocused]);


    const [user, setUser] = useState({});

    const getDataTransaction = () => {
        getData('user').then(u => {
            setUser(u);
            axios.post(webUrl + 'v1/get_riwayat', {
                fid_user: u.id
            }).then(res => {
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
                                }}>Kode Produksi</Text>
                                <Text style={{
                                    flex: 0.2,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.primary,
                                }}>{i.kode}</Text>
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

                            {user.level == "admin" &&
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
                                    }}>{i.kurir}</Text>
                                </View>
                            }

                            {user.level == "admin" &&
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
                            }
                            {user.level == "admin" && <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                }}></Text>

                                <TouchableOpacity onPress={() => printData(i)} style={{
                                    backgroundColor: colors.danger,
                                    width: 100,
                                    paddingVertical: 2,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='print' color={colors.white} />
                                    <Text style={{
                                        left: 5,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 30,
                                        color: colors.white,
                                    }}>Print</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </View>
                    )
                })}
            </ScrollView>


        </SafeAreaView >

    )
}

const styles = StyleSheet.create({})