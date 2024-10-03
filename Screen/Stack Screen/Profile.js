import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function Profile() {
    const [userdata, setUserData] = useState("");
    const navigation = useNavigation();

    async function getData() {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            console.log("Token not found");
            return;
        }
        console.log(token);
        axios.post("http://192.168.223.145:3000/user-data", { token: token })
            .then(res => {
                console.log(res.data);
                setUserData(res.data.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    function signoutButton() {
        navigation.navigate("Login");
        Toast.show({
            type: 'success',
            text1: 'Signed Out',
            text2: 'Succefully Signed Out'
          });
    }

    return (
        <SafeAreaView style={styles.generalContainer}>
            <View style={styles.imageContainer}>
                <Text style={styles.profileTitle}>My Profile</Text>
                <View style={styles.profileImageWrapper}>
                    <Image source={require('./Image/blank-profile-picture-973460_960_720.webp')} style={styles.image} />
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Ionicons name="camera" size={25} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Username</Text>
                        <Text style={styles.infoText}>{userdata.name || <ActivityIndicator/>}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.infoText}>{userdata.email || <ActivityIndicator/>}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.infoText}>{userdata.mobile || <ActivityIndicator/>}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.infoText}>Male</Text>
                    </View>
                </View>

                <View style={styles.signoutContainer}>
                    <TouchableOpacity style={styles.signoutButton} onPress={signoutButton}>
                        <Text style={styles.signoutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    imageContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    profileTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
    },
    profileImageWrapper: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#4a90e2',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        backgroundColor: '#4a90e2',
        borderRadius: 20,
        padding: 6,
    },
    infoContainer: {
        marginTop: 30,
        width: '100%',
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    infoText: {
        fontSize: 16,
        color: '#777',
    },
    signoutContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    signoutButton: {
        backgroundColor: '#d9534f',
        width: 220,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    signoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
