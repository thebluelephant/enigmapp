import { colors } from '@/utils/colors';
import type { Enigma } from '@/types/Quest';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import EnigmaLevel from './EnigmaLevel';
import titleStyle from '@/utils/titleStyle';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { useRouter } from 'expo-router';

interface EnigmaCardProps {
    enigma: Enigma
    state?: 'completed' | 'inProgress'
}

const EnigmaCard = ({ enigma, state }: EnigmaCardProps) => {
    const { setShowEnigmaDetails } = useEnigmappContext();
    const router = useRouter();

    return (
        <View style={[styles.card, styles[state]]}>
            <Image style={styles.image} source={{ uri: enigma.image }} />
            <View style={styles.content}>
                <View>
                    <Text style={titleStyle.default_l}>{enigma.name}</Text>
                    <EnigmaLevel level={enigma.level} />
                </View>
                <View style={styles.buttons}>
                    <Button title={"Plus d'info"} onPress={() => setShowEnigmaDetails(enigma)} type='tertiary' />
                    <Button title={"Démarrer"} onPress={() => router.push(`/quest/${enigma.id}`)} type='primary' />
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: colors.secondaryBackground,
        width: '100%',
        height: 170,
    },
    completed: {
        borderColor: colors.green,
        borderWidth: 2,
    },
    inProgress: {
        borderColor: colors.yellow,
        borderWidth: 2,
    },
    image: {
        height: '40%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover'
    },
    content: {
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

});

export default EnigmaCard;