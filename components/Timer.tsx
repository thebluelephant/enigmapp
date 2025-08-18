import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
    seconds: number;
    onTimerFinished: () => void
    additionalStyle?: object
}

const Timer: React.FC<TimerProps> = ({ seconds, onTimerFinished, additionalStyle }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        setTimeLeft(seconds);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);

                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimerFinished()
        }
    }, [timeLeft]);

    return (
        <View style={[styles.container, additionalStyle]}>
            <Text style={styles.text}>
                {timeLeft}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(178, 178, 178, 0.11)',
    },
    text: {
        color: 'white'
    },

});

export default Timer;