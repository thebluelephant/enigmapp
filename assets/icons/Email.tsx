import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';


// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Email = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
    >
        <G clipPath="url(#clip0_17_17411)">
            <Path
                d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z"
                fill={color}
            />
        </G>
        <Defs>
            <ClipPath id="clip0_17_17411">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>

);

export default Email;
