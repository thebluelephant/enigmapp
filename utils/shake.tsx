import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function Shake({ children, duration = 30, amplitude = 2 }) {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    const shake = () => {
        shakeAnim.setValue(0);
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 1,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -1,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 1,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        shake();
    }, [children]);

    const translateX = shakeAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-amplitude, amplitude],
    });

    return (
        <Animated.View style={{ transform: [{ translateX }] }}>
            {children}
        </Animated.View>
    );
}
