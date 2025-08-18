import Bulb from '@/assets/icons/Bulb';
import { RequestedClues } from '@/types/Clue';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';


import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../Icon';

type Props = {
    clues?: RequestedClues['clues']
}
const Clues = ({ clues }: Props) => {
    if (!clues) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Icon name='bulb' color={colors.yellow} size={15} />
                <Text style={titleStyle.subtitle}>
                    Indices utilisés ({clues.length}/3)
                </Text>
            </View>

            <View style={styles.container}>
                {clues.map((clue) =>
                    <View style={styles.clue} key={clue}>
                        <Text style={titleStyle.subtitle}>{clue} </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        opacity: 0.7
    },
    clue: {
        backgroundColor: '#1C1E25',
        borderColor: "#2A2F3B",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    }
});

export default Clues;