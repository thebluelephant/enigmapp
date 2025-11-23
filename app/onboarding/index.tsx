import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import i18n from '../intl/config';
import Button from '@/components/Button';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import { useEnigmappContext } from '@/utils/EnigmappContext';
import { updateAccountWithCompletedOnboarding, updateAccountWithUsername } from '@/api/Account';
import { useRouter } from 'expo-router';
import { onBoardingSteps } from '@/utils/onBoardingSteps';
import { useGetAccountById } from '@/api/queries/useGetAccountById';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageFrame from '@/components/onboarding/ImageFrame';
import ProgressionBar from '@/components/onboarding/ProgressionBar';
import InspectorNameInput from '@/components/onboarding/InspectorNameInput';

const OnBoarding: React.FC = () => {
    const router = useRouter();
    const { userId } = useEnigmappContext();
    const { data: account, refetch: refetchAccount } = useGetAccountById()
    const [index, setIndex] = useState(0);
    const [username, setUsername] = useState('Martin');

    const steps = onBoardingSteps[index];
    const isFirstStep = index === 0

    const progress = () => {
        if (index < onBoardingSteps.length - 1) setIndex(index + 1);
        else completeOnBoarding();
    };

    const saveUsername = async () => {
        const updatedAccount = await updateAccountWithUsername(userId, username);
        if (updatedAccount.username) {
            refetchAccount()
            progress();
        }
    };

    const completeOnBoarding = () => {
        updateAccountWithCompletedOnboarding(userId).then(() => router.replace('/dashboard'));
    };

    return (
        <>
            <View style={styles.topBar}>
                <Text onPress={completeOnBoarding} style={[titleStyle.default_m, { position: 'absolute', left: 10 }]}>{i18n.t('onboarding.skip')}</Text>
                <ProgressionBar index={index} />
            </View>

            <View style={styles.container}>
                <View style={styles.content}>
                    {steps?.title && <Text style={[titleStyle.default_l, { textAlign: 'center' }]}>{i18n.t(steps.title, { username: account?.username })}</Text>}
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            extraScrollHeight={80}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={[styles.content, { flexGrow: 1 }]}
                        >
                            <ImageFrame source={steps?.imageSource} />
                            <Text style={[titleStyle.subtitle, { textAlign: 'center', fontSize: 15, lineHeight: 20 }]}>{i18n.t(steps.subtitle, { username: account?.username })}</Text>
                            {isFirstStep && <InspectorNameInput onUsernameChange={(username) => setUsername(username)} username={username} />}
                            <Button title={i18n.t('onboarding.next')} onPress={isFirstStep ? saveUsername : progress} type={'primary'} style={{ width: '100%' }} disabled={isFirstStep && username.length < 3} />

                        </KeyboardAwareScrollView>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

export default OnBoarding;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        gap: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        gap: 20,
        width: '100%',
        alignItems: 'center'
    },
    topBar: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
    },
});
