import type { Enigma } from '@/types/Quest';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CurrentEnigmaProps {
    enigma: Enigma;
}
const CurrentEnigma = ({ enigma }: CurrentEnigmaProps) => {
    return (
        <View style={styles.currentEnigma}>
            <Text>{enigma.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    currentEnigma: {
        flex: 1,
    },
});

export default CurrentEnigma;