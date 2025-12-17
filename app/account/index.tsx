import Icon from '@/components/Icon';
import TopBar from '@/components/TopBar';
import { colors } from '@/utils/colors';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Linking } from 'react-native';
import i18n from '../intl/config';
import { useGetAccountById } from '@/api/queries/useGetAccountById';

const AccountScreen: React.FC = () => {
    const { data: account } = useGetAccountById()


    return (
        <View style={styles.container}>
            <TopBar backButton={true} />
            <View style={styles.content}>
                <View style={styles.account}>
                    <Icon name='account' color={colors.disabledBackground} size={100} />
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.label}>{i18n.t('account.username')}</Text>
                            <TextInput
                                style={styles.input}
                                value={account?.username}
                                editable={false}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>{i18n.t('account.user-id')}</Text>
                            <TextInput
                                style={styles.input}
                                value={account?.user_id.substring(0, 5)}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={styles.contact}>
                        <Text style={{ color: colors.disabledText, fontSize: 10 }}>
                            {i18n.t('account.contact')}{' '}
                            <Text
                                style={{ color: colors.yellow, fontSize: 10 }}
                                onPress={() => Linking.openURL('mailto:contact.enigmapp@gmail.com')}
                            >
                                contact.enigmapp@gmail.com
                            </Text>
                        </Text>
                    </View>
                </View>
            </View >
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
    contact: {
        flexDirection: 'row',
        gap: 3

    },
    card: {
        borderColor: colors.yellow,
        borderWidth: 0.3,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#1D212A',
        width: '100%',
        gap: 15
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
        color: colors.disabledText,
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