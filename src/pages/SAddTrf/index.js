import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { maskJs } from 'mask-js';
export default function SAddTrf({ navigation, route }) {

    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

    const options = {
        includeBase64: true,
        quality: 1,
    };

    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_transfer: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };

    const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    elevation: 2,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Image
                    source={{
                        uri: !kirim.foto_transfer ? 'https://zavalabs.com/nogambar.jpg' : kirim.foto_transfer,
                    }}
                    style={{
                        width: '50%',
                        alignSelf: 'center',
                        aspectRatio: 2,
                        resizeMode: 'contain',
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                    }}>

                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                        <MyButton
                            onPress={onPress2}
                            title="GALLERY"
                            colorText={colors.primary}
                            warna={colors.secondary}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState(route.params);

    useEffect(() => {
        console.log('750' + generateData(1));
        setKirim({
            ...kirim,
            biaya: '750' + generateData(1)
        })
    }, [])


    const sendServer = () => {
        console.log(kirim);
        if (kirim.foto_transfer == null) {
            showMessage({
                message: 'Foto masih kosong',
                type: 'danger'
            })
        } else {

            setLoading(true);
            axios.post(apiURL + '1add_nikah.php', kirim).then(res => {
                setLoading(false);
                Alert.alert('SiDani', 'Selamat perintaan kamu berhasil dikirim !');
                navigation.replace('Home');
                console.log(res.data);
            })
        }


    }


    const generateData = (size) => {
        var digits = 3;
        return Array.apply(null, { length: size || 100 }).map(function () {
            return Math.floor(Math.random() * Math.pow(10, digits) + Math.pow(10, digits)).toString().slice(-digits);
        });

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                }}>Total Pembayaran</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                }}>Rp. 750.{generateData(1)}</Text>

                <Text style={{
                    marginTop: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                }}>Silahkan melakukan transfer ke :</Text>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.4,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>Bank</Text>
                    <Text style={{
                        flex: 0.1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>Bank Syariah Indonesia</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.4,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>Rekening</Text>
                    <Text style={{
                        flex: 0.1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>7199478049</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 0.4,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>Atas Nama</Text>
                    <Text style={{
                        flex: 0.1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>:</Text>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>UPTD Masjid Agung Baitul Makmur</Text>
                </View>



                <MyGap jarak={20} />
                <UploadFoto onPress2={() => getGallery(1)} label="Upload Bukti Transfer" />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Simpan" warna={colors.primary} Icons="person-add" />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />
                }
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})