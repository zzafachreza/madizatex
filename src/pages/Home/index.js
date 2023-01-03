import { Alert, StyleSheet, Text, View, Image, Modal, FlatList, ImageBackground, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData, webUrl } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, inputRef } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser from '../../components/MyCarouser';
import ZavalabsScanner from 'react-native-zavalabs-scanner'

export default function Home({ navigation }) {
  const [open, setOPen] = useState({
    modal: true,
    tujuan: '',
    judul: '',
    kode: '',
  })
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [slider, setSlider] = useState({});
  const isFocused = useIsFocused();

  const inputRef = useRef(null);



  useEffect(() => {
    if (isFocused) {
      __getTransaction();
      __getSlider();
    }

  }, [isFocused]);

  const __getSlider = async () => {

    axios.post(apiURL + '1slider.php').then(zz => {
      setSlider(zz.data);
    })

  }

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + '1data_acara.php').then(x => {
        // console.log(x.data);
        setData(x.data);
      })
    })
  }



  return (

    <>

      <SafeAreaView style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
        {/* header */}
        <View style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
          <View style={{
            flexDirection: 'row',
          }}>
            <View style={{
              flex: 1,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 28,
                color: colors.white
              }}>Selamat datang, {user.nama_lengkap}</Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 15,
                color: colors.white
              }}>MazidaTex</Text>
            </View>
            <View style={{
              backgroundColor: colors.white,
              width: 60,
              height: 60,
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Image source={require('../../assets/logo.png')} style={{
                width: 50,
                height: 50,
                resizeMode: 'contain'
              }} />
            </View>
          </View>


        </View>

        {/* <Image source={{
        uri: 'https://sidani.zavalabs.com/' + slider.foto
      }} style={{
        width: windowWidth,
        height: 200,
      }} /> */}
        <MyGap jarak={10} />
        <MyCarouser />

        <ImageBackground source={require('../../assets/bck.png')} style={{
          flex: 1,
          paddingTop: 0,
          justifyContent: 'center'
        }}>



          <View style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('SAdd', user)} style={{
              backgroundColor: colors.primary,
              width: windowWidth / 3,
              height: windowHeight / 6,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Image source={require('../../assets/A1.png')} style={{
                width: windowWidth / 3,
                height: windowHeight / 10,
                resizeMode: 'contain'
              }} />
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.white,
                textAlign: 'center',
                marginTop: '2%'
              }}>Bleaching</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>

              Alert.alert('MazidaTex', 'Pilih tindakan', [
                {
                  text: 'BATAL',
                },
                {
                  text: 'MANUAL',
                  onPress: () => {

                    setOPen({
                      modal: true,
                      tujuan: 'SAddPenjemuran',
                      judul: 'Drying'
                    });
                    setTimeout(() => inputRef.current.focus(), 0)

                  }
                }, {
                  text: 'SCAN',
                  onPress: () => {
                    ZavalabsScanner.showBarcodeReader(result => {
                      console.log('barcode : ', result)

                      if (result !== null) {
                        axios.post(webUrl + 'v1/get_penjemuran', {
                          kode: result
                        }).then(res => {
                          console.log(res.data);
                          navigation.navigate('SAddPenjemuran', res.data);
                        })
                      }

                    })

                  }
                }
              ])
            } style={{
              backgroundColor: colors.primary,
              width: windowWidth / 3,
              height: windowHeight / 6,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Image source={require('../../assets/A2.png')} style={{
                width: windowWidth / 3,
                height: windowHeight / 10,
                resizeMode: 'contain'
              }} />
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.white,
                textAlign: 'center',
                marginTop: '2%'
              }}>Drying</Text>
            </TouchableOpacity>
          </View>


          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <TouchableOpacity onPress={() =>

              Alert.alert('MazidaTex', 'Pilih tindakan', [
                {
                  text: 'BATAL',
                },
                {
                  text: 'MANUAL',
                  onPress: () => {
                    setTimeout(() => inputRef.current.focus(), 0)
                    setOPen({
                      modal: true,
                      tujuan: 'SAddPencacahan',
                      judul: 'Packing'
                    })

                  }
                }, {
                  text: 'SCAN',
                  onPress: () => {
                    ZavalabsScanner.showBarcodeReader(result => {
                      console.log('barcode : ', result)

                      if (result !== null) {
                        axios.post(webUrl + 'v1/get_penjemuran', {
                          kode: result
                        }).then(res => {
                          console.log(res.data);
                          navigation.navigate('SAddPencacahan', res.data);
                        })
                      }

                    })

                  }
                }
              ])



            } style={{
              backgroundColor: colors.primary,
              width: windowWidth / 3,
              height: windowHeight / 6,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Image source={require('../../assets/A3.png')} style={{
                width: windowWidth / 3,
                height: windowHeight / 10,
                resizeMode: 'contain'
              }} />
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.white,
                textAlign: 'center',
                marginTop: '2%'
              }}>Packing</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>




              Alert.alert('MazidaTex', 'Pilih tindakan', [
                {
                  text: 'BATAL',
                },
                {
                  text: 'MANUAL',
                  onPress: () => {
                    setTimeout(() => inputRef.current.focus(), 0)
                    setOPen({
                      modal: true,
                      tujuan: 'SAddDistribusi',
                      judul: 'Distribusi'
                    })

                  }
                }, {
                  text: 'SCAN',
                  onPress: () => {
                    ZavalabsScanner.showBarcodeReader(result => {
                      console.log('barcode : ', result)

                      if (result !== null) {
                        axios.post(webUrl + 'v1/get_penjemuran', {
                          kode: result
                        }).then(res => {
                          console.log(res.data);
                          navigation.navigate('SAddDistribusi', res.data);
                        })
                      }

                    })

                  }
                }
              ])


            } style={{
              backgroundColor: colors.primary,
              width: windowWidth / 3,
              height: windowHeight / 6,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
              <Image source={require('../../assets/A4.png')} style={{
                width: windowWidth / 3,
                height: windowHeight / 10,
                resizeMode: 'contain'
              }} />
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.white,
                textAlign: 'center',
                marginTop: '2%'
              }}>Distribusi</Text>
            </TouchableOpacity>
          </View>


        </ImageBackground>




        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.secondary
        }}>
          <TouchableOpacity onPress={() => {

            navigation.navigate('STentang')
          }} style={{
            padding: 10,
            width: windowWidth / 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon color={colors.white} type='ionicon' name='person-outline' />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 38,
              color: colors.white,
            }}>Akun</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

            navigation.navigate('SCek')
          }} style={{
            padding: 10,
            width: windowWidth / 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon color={colors.white} type='ionicon' name='newspaper-outline' />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 38,
              color: colors.white,
            }}>Riwayat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('SiDani', 'Apakah kamu yakin akan keluar ?', [
            {
              text: 'Tidak',
              type: 'cancel'
            },
            {
              text: 'Keluar',
              onPress: () => {
                storeData('user', null);
                navigation.replace('Login')
              }
            }
          ])} style={{
            padding: 10,
            width: windowWidth / 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon color={colors.white} type='ionicon' name='log-out-outline' />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 38,
              color: colors.white,
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>




      </SafeAreaView >


      {open.modal && <View style={{
        position: 'absolute',
        width: windowWidth,
      }}>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                flex: 1,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
              }}>{open.judul}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setOPen({
                    modal: false,
                    judul: '',
                    tujuan: '',
                    kode: '',
                  })
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>

            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
              }}>
                <TextInput ref={inputRef} style={{
                  backgroundColor: colors.zavalabs,
                  marginVertical: 5,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 20
                }} onChangeText={x => setOPen({
                  ...open,
                  kode: x
                })} keyboardType="number-pad" />
              </View>
            </View>
            <View style={{
              marginTop: 5,
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
              }}>
                <MyButton onPress={() => {
                  console.log(open.kode);
                  axios.post(webUrl + 'v1/get_penjemuran', {
                    kode: open.kode
                  }).then(res => {
                    setOPen({
                      modal: false,
                      judul: '',
                      tujuan: '',
                      kode: '',
                    })
                    console.log(res.data);
                    navigation.navigate(open.tujuan, res.data);
                  })
                }} title="Submit" />
              </View>
            </View>


          </View>
        </View>
      </View>}

    </>

  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})