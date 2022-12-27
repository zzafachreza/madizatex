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
import Orientation from 'react-native-orientation-locker';
import { ImageBackground } from 'react-native';

export default function TimSetDetail({ navigation, route }) {
    const i = route.params;
    const ref = useRef();

    const isFocused = useIsFocused();
    const [link, setLink] = useState('');

    useEffect(() => {
        ref.current.capture().then(uri => {
            console.log("do something with ", uri);
            setLink(uri);
        });
    }, [])



    return (
        <>
            <ViewShot style={{
                flex: 1,
            }} ref={ref} options={{ fileName: i.kode, format: "png", quality: 1 }}>
                <ImageBackground source={require('../../assets/bck.png')} style={{
                    flex: 1,
                    opacity: 1,
                    backgroundColor: colors.white,
                    padding: 10,
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        {/* header */}
                        <View style={{
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 5,
                            }}>
                                <Text style={{
                                    flex: 0.5,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>Lokasi</Text>
                                <Text style={{
                                    flex: 0.1,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>:</Text>
                                <Text style={{
                                    flex: 1.5,
                                    fontFamily: fonts.primary[400],
                                    fontSize: windowWidth / 30
                                }}>{i.lokasi}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 5,
                            }}>
                                <Text style={{
                                    flex: 0.5,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>Tanggal</Text>
                                <Text style={{
                                    flex: 0.1,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>:</Text>
                                <Text style={{
                                    flex: 1.5,
                                    fontFamily: fonts.primary[400],
                                    fontSize: windowWidth / 30
                                }}>{i.tanggal} Pukul {i.waktu}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 5,
                            }}>
                                <Text style={{
                                    flex: 0.5,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>Oleh</Text>
                                <Text style={{
                                    flex: 0.1,
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 30
                                }}>:</Text>
                                <Text style={{
                                    flex: 1.5,
                                    fontFamily: fonts.primary[400],
                                    fontSize: windowWidth / 30
                                }}>{i.oleh}</Text>
                            </View>
                        </View>

                        <Text style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            color: colors.black,
                            fontFamily: fonts.secondary[600]
                        }}>Calon Suami</Text>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View>
                                <Image source={{
                                    uri: i.suami_foto
                                }} style={{
                                    height: 150,
                                    width: 100,
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Nama</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.suami_nama}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>TTL</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.suami_tempat_lahir}, {i.suami_tanggal_lahir}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Telepon</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.suami_telepon}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Pekerjaan</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.suami_pekerjaan}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Alamat</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.suami_alamat}</Text>
                                </View>
                            </View>
                        </View>


                        <Text style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            color: colors.black,
                            fontFamily: fonts.secondary[600]
                        }}>Calon Istri</Text>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View>
                                <Image source={{
                                    uri: i.istri_foto
                                }} style={{
                                    height: 150,
                                    width: 100,
                                }} />
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Nama</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.istri_nama}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>TTL</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.istri_tempat_lahir}, {i.istri_tanggal_lahir}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Telepon</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.istri_telepon}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Pekerjaan</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.istri_pekerjaan}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                        flex: 0.5,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>Alamat</Text>
                                    <Text style={{
                                        flex: 0.1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: windowWidth / 30
                                    }}>:</Text>
                                    <Text style={{
                                        flex: 1.5,
                                        fontFamily: fonts.primary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.istri_alamat}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                </ImageBackground>
            </ViewShot>
            <View style={{
                padding: 10,
            }}>
                <MyButton title="Share" warna={colors.black} onPress={() => {
                    Share.open({
                        url: link,
                        title: 'E -Tiket Aplikasi SiDani',
                        message: 'E -Tiket Aplikasi SiDani',

                    }).then(s => {
                        console.log(s)
                    })
                }} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({})