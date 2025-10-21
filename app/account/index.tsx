import Button from '@/components/Button';
import Icon from '@/components/Icon';
import TopBar from '@/components/TopBar';
import { colors } from '@/utils/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import i18n from '../intl/config';


const AccountScreen: React.FC = () => {
    const { clearSession, user } = useAuth0()
    const router = useRouter()

    const logout = async () => {
        try {
            await clearSession()
            router.replace('/login');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <TopBar backButton={true} />
            <View style={styles.content}>
                <View style={styles.account}>
                    <Icon name='account' color={colors.disabledBackground} size={100} />
                    <View style={styles.card}>
                        <Text style={styles.label}>{i18n.t('account.username')}</Text>
                        <TextInput
                            style={[styles.input, { marginBottom: 15 }]}
                            value={user?.username}
                            editable={false}
                        />
                        <Text style={styles.label}>{i18n.t('account.email')}</Text>
                        <TextInput
                            style={styles.input}
                            value={user?.email}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.logoutContainer}>
                    <Button title={i18n.t('account.logout')} onPress={() => logout()} type={'primary'} />
                </View>
            </View>


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 20
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10
    },
    logoutContainer: {
        height: 50,
        borderRadius: 15
    },
    card: {
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#1D212A',
        width: '100%'
    },
    account: {
        gap: 30,
        alignItems: 'center'
    },
    label: {
        marginBottom: 6,
        fontSize: 12,
        color: '#9DA3AF',
    },
    input: {
        backgroundColor: '#111827',
        borderRadius: 6,
        padding: 12,

        fontSize: 16,
        color: 'white',
    },
    button: {
        backgroundColor: '#e53935',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AccountScreen;