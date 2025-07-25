import Svg, { Path } from 'react-native-svg';


// Convert SVG to react native tool : https://www.svgviewer.dev/svg-to-react-native-jsx

const Bulb = ({ height = 20, color = "#707070" }) => (
    <Svg
        width={height}
        height={height}
        viewBox="0 0 512 512"
    >
        <Path fill={color} d="M288,464H224a16,16,0,0,0,0,32h64a16,16,0,0,0,0-32Z" />
        <Path fill={color} d="M304,416H208a16,16,0,0,0,0,32h96a16,16,0,0,0,0-32Z" />
        <Path fill={color} d="M369.42,62.69C339.35,32.58,299.07,16,256,16A159.62,159.62,0,0,0,96,176c0,46.62,17.87,90.23,49,119.64l4.36,4.09C167.37,316.57,192,339.64,192,360v24a16,16,0,0,0,16,16h24a8,8,0,0,0,8-8V274.82a8,8,0,0,0-5.13-7.47A130.73,130.73,0,0,1,208.71,253,16,16,0,1,1,227.29,227c7.4,5.24,21.65,13,28.71,13s21.31-7.78,28.73-13A16,16,0,0,1,303.29,253a130.73,130.73,0,0,1-26.16,14.32,8,8,0,0,0-5.13,7.47V392a8,8,0,0,0,8,8h24a16,16,0,0,0,16-16V360c0-19.88,24.36-42.93,42.15-59.77l4.91-4.66C399.08,265,416,223.61,416,176A159.16,159.16,0,0,0,369.42,62.69Z" />
    </Svg>

);

export default Bulb;
