import i18n from '@/app/intl/config';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Header: React.FC = () =>
    <View style={styles.header}>
        <Text style={styles.title}>Enigmapp</Text>
        <Text style={[titleStyle.default_l, { marginBottom: 20 }]}>{i18n.t('login.subtitle')}</Text>
        <Text style={[titleStyle.default_s, { textAlign: 'center', color: colors.disabledText }]}>{i18n.t('login.legend')}</Text>
    </View>

export default Header;

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    title: {
        fontSize: 50,
        color: 'white'
    },
});