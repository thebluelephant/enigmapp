import React, { ReactNode } from 'react';
import { Modal as RNModal } from 'react-native';
import Icon from './Icon';
import type { StyleProp, ViewStyle } from 'react-native';


type GenericModalProps = {
    visible: boolean;
    onClose?: () => void;
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

const GenericModal: React.FC<GenericModalProps> = ({
    visible,
    onClose,
    children,
    style
}) =>
    <RNModal
        style={style}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
        transparent
    >

        {children}
    </RNModal>


export default GenericModal;