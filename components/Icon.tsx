import Account from '@/assets/icons/Account';
import Bulb from '@/assets/icons/Bulb';
import Camera from '@/assets/icons/Camera';
import Close from '@/assets/icons/Close';
import Info from '@/assets/icons/Info';
import React from 'react';

export type IconName = 'bulb' | 'info' | 'camera' | 'close'

interface IconProps {
    name: string,
    color?: string
    size?: number
}
const Icon = ({ name, color, size }: IconProps) => {
    switch (name) {
        case 'bulb':
            return <Bulb color={color} height={size} />
        case 'info':
            return <Info color={color} height={size} />
        case 'camera':
            return <Camera color={color} height={size} />
        case 'close':
            return <Close color={color} height={size} />
        case 'account':
            return <Account color={color} height={size} />
        default:
            break;
    }
    return null;
};

export default Icon;