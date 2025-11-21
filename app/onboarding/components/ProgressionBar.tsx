import { colors } from '@/utils/colors';
import { onBoardingSteps } from '@/utils/onBoardingSteps';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressionBar: React.FC<{ index: number }> = ({ index }: { index: number }) => {
    return (
        <View style={styles.progression}>
            {onBoardingSteps.map((_, stepIndex) => (
                <View key={stepIndex} style={[styles.step, stepIndex < index && styles.isDone]} />
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    progression: {
        flexDirection: 'row',
        gap: 10,
        width: "100%",
        justifyContent: 'center'
    },
    step: {
        width: 10,
        height: 10,
        backgroundColor: colors.disabledBackground,
        borderRadius: 100
    },
    isDone: {
        backgroundColor: colors.yellow
    },
});

export default ProgressionBar;