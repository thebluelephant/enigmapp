import React from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import GenericModal from '../GenericModal';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import Button from '../Button';
import { useEnigmappContext } from '@/utils/EnigmappContext';

type IntroductionModalProps = {
    text: string | undefined,
    image: string | undefined
};

const IntroductionModal: React.FC<IntroductionModalProps> = ({
    text,
    image
}) => {
    const { showIntroductionModal, setShowIntroductionModal } = useEnigmappContext()

    return (
        <GenericModal visible={showIntroductionModal}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <Image style={styles.image
                        } source={{ uri: image }} />
                        <View style={styles.content}>
                            <Text style={titleStyle.subtitle}>{text}</Text>
                            <View >
                                <Button title='OK !' onPress={() => setShowIntroductionModal(false)} type='primary' />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </GenericModal >
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        padding: 30,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(178, 178, 178, 0.58)',
    },
    container: {
        backgroundColor: colors.tertiaryBackground,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: colors.yellow,
        padding: 20,
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 5,
        marginBottom: 20
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    }
});

export default IntroductionModal;