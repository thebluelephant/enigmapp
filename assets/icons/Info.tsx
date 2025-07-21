import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';


// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Info = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
        fill={color}

    >
        <G clipPath="url(#clip0_6_12344)">
            <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill={color}
            />
        </G>
        <Defs>
            <ClipPath id="clip0_6_12344">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>

);

export default Info;
