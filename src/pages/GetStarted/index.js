import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function GetStarted({ navigation }) {





    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.primary,
            }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 30,

            }}>


                <Text style={{
                    textAlign: 'center',
                    fontSize: windowWidth / 10,
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    marginBottom: 20,
                }}>PILIH TIM</Text>

                <MyButton onPress={() => navigation.navigate('TimAdd')} warna={colors.secondary} title="Baru" />
                <MyGap jarak={20} />
                <MyButton onPress={() => navigation.navigate('TimList')} warna={colors.secondary} title="Cari" />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({});
