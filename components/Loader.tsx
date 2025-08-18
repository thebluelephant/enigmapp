import { colors } from '@/utils/colors';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader: React.FC = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.yellow} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});

export default Loader;