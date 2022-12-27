import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData, webUrl } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs } from 'mask-js';
import { BluetoothEscposPrinter, BluetoothManager } from 'react-native-bluetooth-escpos-printer';
export default function SAddPencacahan({ navigation, route }) {

    const isFocus = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [macam, setMacam] = useState([]);

    const [data, setData] = useState([]);

    const [kirim, setKirim] = useState(route.params);
    const [paired, setPaired] = useState({});
    useEffect(() => {

        getData('paired').then(res => {
            if (!res) {
                Alert.alert('MazidaTex', 'Harap hubungkan printer kamu !')
            } else {
                console.log(res);
                setPaired(res);
            }
        })

        if (isFocus) {
            getSupplier();
            getMacam();
        }

    }, [isFocus])



    const getSupplier = () => {
        axios.post(webUrl + 'supplier/api_get_done', {
            fid_user: route.params.fid_user,
            kode: route.params.kode
        }).then(res => {
            setKirim({
                ...kirim,
                kuantitas: res.data.kuantitas
            })
            setData(res.data.data);

        })
    }


    const getMacam = () => {
        axios.post(webUrl + 'v1/macam').then(res => {
            console.log(res.data);
            setMacam(res.data);
            setKirim({
                ...kirim,
                macam: res.data[0].value
            })
            // setData(res.data.data);

        })
    }



    const sendServer = () => {
        console.log(kirim);
        axios.post(webUrl + 'v1/update_pencacahan', kirim).then(res => {
            console.log(res.data);
            Alert.alert('Berhasil', `${res.data}`, [
                {
                    text: 'KEMBALI',
                    onPress: () => navigation.goBack()
                }, {
                    text: 'PRINT',
                    onPress: async () => {
                        BluetoothManager.connect(paired.inner_mac_address)
                            .then(async (s) => {
                                console.log(s);
                                let columnWidths = [8, 20, 20];
                                try {





                                    // await BluetoothEscposPrinter.printPic(logoCetak, { width: 250, left: 150 });
                                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                    await BluetoothEscposPrinter.printColumn(
                                        [10, 2, 20],
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                                        [`Status`, ':', `PENCACAHAN`],
                                        {},
                                    );
                                    await BluetoothEscposPrinter.printText("--------------------------------\n\r", {});

                                    await BluetoothEscposPrinter.printColumn(
                                        [10, 2, 20],
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                                        [`Kode`, ':', `${res.data}`],
                                        {},
                                    );
                                    await BluetoothEscposPrinter.printColumn(
                                        [10, 2, 20],
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                                        [`Tanggal`, ':', `${new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()}`],
                                        {},
                                    );
                                    await BluetoothEscposPrinter.printColumn(
                                        [10, 2, 20],
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                                        [`Jenis`, ':', `${kirim.jenis}`],
                                        {},
                                    );
                                    await BluetoothEscposPrinter.printColumn(
                                        [10, 2, 20],
                                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
                                        [`Ket`, ':', `${kirim.keterangan}`],
                                        {},
                                    );
                                    await BluetoothEscposPrinter.printQRCode(
                                        `${res.data}`,
                                        280,
                                        BluetoothEscposPrinter.ERROR_CORRECTION.L,
                                    );
                                    await BluetoothEscposPrinter.printText('\r\n\r\n', {});
                                } catch (e) {
                                    alert(e.message || 'ERROR');
                                }



                            }, (e) => {

                                alert(e);
                            })

                    }
                }
            ]);


        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.tanggal}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            backgroundColor: colors.zavalabs,
                            borderColor: colors.zavalabs,
                            borderRadius: 10,
                            // borderWidth: 1,
                            paddingLeft: 10,
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.primary[400],

                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setKirim({ ...kirim, tanggal: date })}
                />


                <MyGap jarak={10} />
                <MyInput value={kirim.jenis} label="Jenis" iconname="grid-outline" onChangeText={x => setKirim({
                    ...kirim,
                    jenis: x
                })} placeholder="Masukan Jenis" />
                <MyGap jarak={10} />
                <MyPicker data={macam} value={kirim.macam} label="Macam" iconname="list-outline" onValueChange={x => setKirim({
                    ...kirim,
                    macam: x
                })} placeholder="Masukan Jenis" />
                <MyGap jarak={20} />

                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.white }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600]
                        }}>No</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.white }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600]
                        }}>Supplier</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.white }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600]
                        }}>Kuantitas</Text>
                    </View>
                </View>


                {data.map(i => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.white }}>
                                <Text style={{
                                    color: colors.black,
                                    fontFamily: fonts.secondary[600]
                                }}>{i.no}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.white }}>
                                <Text style={{
                                    color: colors.black,
                                    fontFamily: fonts.secondary[600]
                                }}>{i.supplier}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.white }}>
                                <Text style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    color: colors.black,
                                    fontFamily: fonts.secondary[600]
                                }}>{i.qty}</Text>

                            </View>
                        </View>
                    )
                })}


                <View style={{
                    flexDirection: 'row',
                }}>

                    <View style={{ flex: 1.2, padding: 10, backgroundColor: colors.zavalabs, borderWidth: 1, borderColor: colors.white }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[600]
                        }}>Kuantitas Total</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', backgroundColor: colors.zavalabs, borderWidth: 1, borderColor: colors.white }}>
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            color: colors.black,
                            fontFamily: fonts.secondary[600]
                        }}>{kirim.kuantitas}</Text>

                    </View>
                </View>
                <MyInput label="Kuantitas Saat ini" value={kirim.kuantitas.toString()} onChangeText={x => setKirim({
                    ...kirim,
                    kuantitas: x
                })} iconname="cube-outline" />
                <MyGap jarak={10} />
                <MyInput label="Keterangan" value={kirim.keterangan} onChangeText={x => setKirim({
                    ...kirim,
                    keterangan: x
                })} placeholder="Masukan keterangan" multiline iconname="create-outline" />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Simpan Data" warna={colors.secondary} />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />
                }
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})