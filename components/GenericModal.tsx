import React, { ReactNode, useEffect, useState } from 'react';
import { Modal as RNModal, View, StyleSheet, Text, Pressable } from 'react-native';
import Icon from './Icon';


type GenericModalProps = {
    visible: boolean;
    onClose?: () => void;
    children: ReactNode;
};

const GenericModal: React.FC<GenericModalProps> = ({
    visible,
    onClose,
    children,
}) =>
    <RNModal
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
        transparent
    >

        {children}
    </RNModal>


export default GenericModal;