
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Check = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
    >
        <G clipPath="url(#clip0_11_1325)">
            <Path
                d="M9 16.2L5.5 12.7C5.11 12.31 4.49 12.31 4.1 12.7C3.71 13.09 3.71 13.71 4.1 14.1L8.29 18.29C8.68 18.68 9.31 18.68 9.7 18.29L20.3 7.70001C20.69 7.31001 20.69 6.69001 20.3 6.30001C19.91 5.91001 19.29 5.91001 18.9 6.30001L9 16.2Z"
                fill={color}
            />
        </G>
        <Defs>
            <ClipPath id="clip0_11_1325">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>

);

export default Check;
