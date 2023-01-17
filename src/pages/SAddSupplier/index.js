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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { maskJs } from 'mask-js';

export default function SAddSupplier({ navigation, route }) {
    const fid_user = route.params.fid_user;

    const [supp, setSupp] = useState([]);
    const [kirim, setKirim] = useState({
        fid_user: route.params.fid_user,
        keterangan_supplier: '',
        qty: 0,
    })

    useEffect(() => {
        axios.post(apiURL + '1data_supplier.php').then(res => {
            setSupp(res.data);
            setKirim({
                ...kirim,
                supplier: res.data[0].value
            })
        })
    }, []);

    const sendServer = () => {


        if (kirim.qty > 0) {
            console.log(kirim);

            axios.post(webUrl + 'supplier/api_insert', kirim).then(res => {
                console.log(res.data);
                showMessage({
                    type: 'success',
                    message: 'Supplier' + kirim.supplier + ' Kuantitas ' + kirim.qty
                });
                navigation.goBack();

            })

        } else {
            showMessage({
                type: 'danger',
                message: 'Silahkan isi kuantitas'
            })
        }
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyPicker label="Supplier" onValueChange={x => setKirim({
                    ...kirim,
                    supplier: x
                })} iconname="search" data={supp} />
                <MyGap jarak={10} />
                <MyInput value={kirim.qty} label="Kuantitas" onChangeText={x => setKirim({
                    ...kirim,
                    qty: x
                })} iconname="cube-outline" keyboardType="number-pad" />
                <MyGap jarak={10} />
                <MyInput value={kirim.keterangan_supplier} label="Keterangan Supplier" onChangeText={x => setKirim({
                    ...kirim,
                    keterangan_supplier: x
                })} iconname="create-outline" />
                <MyGap jarak={10} />
                <MyButton title="Simpan Data" onPress={sendServer} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})