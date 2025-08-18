import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

const AccountHeader = () => {
    return (
        <ImageBackground
            source={require('../../assets/images/inspector-office.jpg')}
            imageStyle={{ opacity: 0.2, height: 'auto', width: '100%' }}
            resizeMode='cover'>
            <View style={styles.container}>
                <Text style={[titleStyle.default_l, styles.title]}>Bienvenue inspecteur !</Text>
                <Text style={titleStyle.subtitle}>Prêt a résoudre des énigmes grâce a votre caméra ?</Text>
                <View style={styles.rankContainer} >
                    <Text style={styles.ranking}>Classement : Expert</Text>
                    <Text style={styles.ranking}>8/12 cas résolus</Text>
                </View>
                <View style={styles.subCards}>
                    <View style={styles.subCard}>
                        <Text style={titleStyle.subtitle}>Current case</Text>
                        <Text style={styles.progress}>40% completed</Text>
                    </View>
                    <View style={styles.subCard}>
                        <Text style={titleStyle.subtitle}>Available coins</Text>
                        <Text style={styles.progress}>250</Text>
                    </View>
                </View>
            </View>
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        borderRadius: 8,
        borderColor: colors.yellow,
        borderWidth: 0.3,
        padding: 15
    },
    title: {
        marginBottom: 4,
    },
    rankContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        paddingVertical: 10,
    },
    ranking: {
        fontFamily: "Roboto_700Bold",
        color: colors.primaryText,
        fontSize: 12,
    },
    subCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    subCard: {
        backgroundColor: 'black',
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progress: {
        color: colors.yellow,
        fontFamily: "Roboto_700Bold",
        fontSize: 12,
    }
});

export default AccountHeader;