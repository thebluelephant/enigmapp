import BackArrow from '@/assets/icons/BackArrow';
import Coin from '@/assets/icons/Coin';
import { colors } from '@/utils/colors';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';

interface TopBarProps {
    backButton?: boolean,
    credit?: boolean
}
const TopBar: React.FC<TopBarProps> = ({ backButton, credit }: TopBarProps) => {
    return (
        <View style={styles.container}>
            {
                backButton &&
                <Pressable onPress={() => router.back()}>
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