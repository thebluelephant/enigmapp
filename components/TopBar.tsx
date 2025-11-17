import BackArrow from '@/assets/icons/BackArrow';
import Coin from '@/assets/icons/Coin';
import { colors } from '@/utils/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Account from '@/assets/icons/Account';

interface TopBarProps {
    backButton?: boolean,
    credit?: boolean
    account?: boolean
}
const TopBar: React.FC<TopBarProps> = ({ backButton, credit, account }: TopBarProps) => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            {
                backButton &&
                <Pressable onPress={() => router.replace('/home')}>
                    <BackArrow color={colors.yellow} height={24} />
                </Pressable>
            }
            {
                credit &&
                <View style={styles.coin}>
                    <Coin color={colors.yellow} />
                    <Text style={[styles.credit]}>250</Text>
                </View>
            }
            {
                account && <Pressable onPress={() => router.navigate('/account')}>
                    <Account color={colors.yellow} height={24} />
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
    },
    credit: {
        color: colors.yellow
    },
    coin: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: 5
    }
});

export default TopBar;