import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';


// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Account = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
    >
        <G clipPath="url(#clip0_11_1368)">
            <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                fill={color}
            />
        </G>
        <Defs>
            <ClipPath id="clip0_11_1368">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>

);

export default Account;
