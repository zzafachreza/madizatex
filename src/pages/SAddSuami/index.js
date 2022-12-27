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
export default function SAddSuami({ navigation, route }) {

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
                                suami_foto: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 2 MB',
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
                    {label} Maksimal 2MB
                </Text>
                <Image
                    source={{
                        uri: !kirim.suami_foto ? 'https://zavalabs.com/nogambar.jpg' : kirim.suami_foto,
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

    const sendServer = () => {
        console.log(kirim);

        if (kirim.suami_nama == null) {
            showMessage({
                message: 'Nama masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_tempat_lahir == null) {
            showMessage({
                message: 'Tempat lahir masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_tanggal_lahir == null) {
            showMessage({
                message: 'Tanggal lahir masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_pekerjaan == null) {
            showMessage({
                message: 'Pekerjaan masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_telepon == null) {
            showMessage({
                message: 'Telepon masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_alamat == null) {
            showMessage({
                message: 'Alamat masih kosong',
                type: 'danger'
            })
        } else if (kirim.suami_foto == null) {
            showMessage({
                message: 'Foto masih kosong',
                type: 'danger'
            })
        } else {
            navigation.navigate('SAddIstri', kirim);
        }

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>

                <MyInput value={kirim.suami_nama} label="Nama" onChangeText={x => {

                    setKirim({
                        ...kirim,
                        suami_nama: x
                    })
                }} iconname="person" placeholder="masukan nama" />
                <MyGap jarak={10} />
                <MyInput value={kirim.suami_tempat_lahir} label="Tempat dan Tanggal lahir" onChangeText={x => {

                    setKirim({
                        ...kirim,
                        suami_tempat_lahir: x
                    })
                }} iconname="person" placeholder="masukan tempat lahir" />
                <MyGap jarak={10} />
                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.suami_tanggal_lahir}
                    mode="date"
                    placeholder="pilih tanggal lahir"
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
                    onDateChange={(date) => setKirim({ ...kirim, suami_tanggal_lahir: date })}
                />

                <MyGap jarak={10} />
                <MyInput value={kirim.suami_pekerjaan} label="Pekerjaan" onChangeText={x => {

                    setKirim({
                        ...kirim,
                        suami_pekerjaan: x
                    })
                }} iconname="clipboard" placeholder="masukan pekerjaan" />
                <MyGap jarak={10} />
                <MyInput keyboardType="number-pad" maxLength={15} value={kirim.suami_telepon} label="Telepon / Nomor HP" onChangeText={x => {

                    setKirim({
                        ...kirim,
                        suami_telepon: x
                    })
                }} iconname="call" placeholder="masukan telepon" />
                <MyGap jarak={10} />

                <MyInput value={kirim.suami_alamat} label="Alamat" onChangeText={x => {

                    setKirim({
                        ...kirim,
                        suami_alamat: x
                    })
                }} iconname="home" placeholder="masukan alamat" />

                <MyGap jarak={20} />
                <UploadFoto onPress2={() => getGallery(1)} label="Upload pas foto (latar biru)" />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} title="Selanjutnya" warna={colors.primary} Icons="person-add" />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />
                }
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})