import TopBar from '@/components/TopBar';
import { colors } from '@/utils/colors';
import titleStyle from '@/utils/titleStyle';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from "react-native";

const CGU = () => {
    return (
        <View style={styles.container}>
            <TopBar backButton={true} />
            <ScrollView style={{ padding: 24 }}>
                <Text style={titleStyle.default_m}>Conditions Générales d'Utilisation</Text>
                <Text style={[titleStyle.default_s, { paddingBottom: 40 }]}>
                    1. Présentation de l’Application {"\n"}
                    L’application Enigmapp (ci-après « l’Application ») est éditée par [Nom de ton studio ou société], dont le siège social est situé à [adresse].{"\n"}
                    Elle propose une expérience ludique et interactive d’énigmes à résoudre en photographiant des objets du quotidien.{"\n"}

                    En accédant et en utilisant l’Application, l’utilisateur (ci-après « l’Utilisateur ») reconnaît avoir pris connaissance des présentes Conditions Générales d’Utilisation (CGU) et les accepter pleinement.{"\n"}
                    {"\n"}
                    2. Objet{"\n"}

                    Les présentes CGU ont pour objet de définir les modalités et conditions d’utilisation de l’Application ainsi que les droits et obligations des Utilisateurs.{"\n"}
                    {"\n"}
                    3. Accès et utilisation de l’Application{"\n"}

                    L’Application est destinée à un usage strictement personnel et non commercial.{"\n"}

                    L’Utilisateur s’engage à utiliser l’Application conformément aux lois et réglementations en vigueur.{"\n"}

                    L’accès à certaines fonctionnalités peut nécessiter une connexion Internet et l’utilisation de la caméra de l’appareil mobile.{"\n"}
                    {"\n"}
                    4. Utilisation de la caméra et traitement des images{"\n"}

                    L’Application utilise la caméra du terminal de l’Utilisateur afin de permettre la reconnaissance d’objets dans le cadre du jeu.{"\n"}

                    Aucune photo n’est enregistrée, stockée ou transmise par l’Application : les images sont uniquement analysées en temps réel, sur l’appareil de l’Utilisateur.{"\n"}

                    L’Utilisateur s’engage à ne pas utiliser l’Application pour photographier ou analyser des contenus illégaux, sensibles ou portant atteinte aux droits de tiers.{"\n"}
                    {"\n"}
                    5. Données personnelles et confidentialité{"\n"}

                    Dans le cadre de son utilisation, l’Application peut collecter certaines données personnelles (par exemple : adresse e-mail lors de la création d’un compte).{"\n"}

                    Le traitement de ces données respecte la réglementation applicable, notamment le Règlement Général sur la Protection des Données (RGPD).{"\n"}

                    Pour plus de détails, l’Utilisateur est invité à consulter la Politique de Confidentialité distincte, accessible depuis l’Application et le site Internet associé.{"\n"}
                    {"\n"}
                    6. Propriété intellectuelle{"\n"}

                    L’ensemble des contenus présents dans l’Application (textes, énigmes, graphismes, interfaces, logos, éléments sonores, mécaniques de jeu, etc.) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de l’éditeur.{"\n"}

                    L’Utilisateur dispose uniquement d’un droit d’utilisation personnel, non exclusif et non transférable. Toute reproduction ou utilisation non autorisée est interdite.{"\n"}
                    {"\n"}
                    7. Responsabilités{"\n"}

                    L’éditeur s’efforce de fournir un service de qualité, mais ne garantit pas que l’Application sera exempte d’erreurs, de bugs ou d’interruptions.{"\n"}

                    L’Utilisateur est seul responsable de l’usage qu’il fait de l’Application et de son environnement lors de l’utilisation (par exemple, attention aux déplacements en prenant des photos).{"\n"}

                    L’éditeur ne pourra être tenu responsable de dommages résultant d’une utilisation inappropriée ou dangereuse de l’Application.{"\n"}
                    {"\n"}
                    8. Modification des CGU{"\n"}

                    L’éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les nouvelles conditions entreront en vigueur dès leur mise en ligne dans l’Application.{"\n"}
                    {"\n"}
                    9. Résiliation{"\n"}

                    L’Utilisateur peut cesser d’utiliser l’Application à tout moment en la désinstallant.{"\n"}
                    En cas de non-respect des présentes CGU, l’éditeur pourra suspendre ou supprimer l’accès de l’Utilisateur à l’Application.{"\n"}
                    {"\n"}
                    10. Droit applicable et juridiction compétente{"\n"}

                    Les présentes CGU sont soumises au droit français.{"\n"}
                    En cas de litige, et après tentative de résolution amiable, les tribunaux compétents de [ville/pays] seront seuls compétents.{"\n"}
                </Text>
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: '#444',
    },
});

export default CGU;