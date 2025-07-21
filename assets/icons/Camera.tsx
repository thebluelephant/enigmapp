import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';


// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Camera = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
        fill={color}
    >
        <G clipPath="url(#clip0_6_10757)">
            <Path
                d="M12 15.2C13.7674 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7674 8.79999 12 8.79999C10.2327 8.79999 8.80005 10.2327 8.80005 12C8.80005 13.7673 10.2327 15.2 12 15.2Z"
                fill={color}
            />
            <Path
                d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
                fill={color}
            />
        </G>
        <Defs>
            <ClipPath id="clip0_6_10757">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default Camera;
