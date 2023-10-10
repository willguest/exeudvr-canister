import img from "./../assets/Build/unity_build.jpg";
import { Grid } from 'react-loading-icons'

function LoadingScreen(props) {
    const styleBanner = {
        position: "absolute",
        width: "100%",
        maxHeight: undefined,
        background: "#000000",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        alignItems: "center",
	}
    const styleImg = {
        display: "flex",
        width: "100%",
        maxHeight: undefined
	}
    return (
        <div style={styleBanner}>
            <img src={img} alt="island collective" style={styleImg} />
            <p>
            <Grid height="1em" stroke="#b4a785" />
                Loading. Please wait...
            <Grid height="1em" stroke="#b4a785" />
            </p>
        </div>
    );
}
export default LoadingScreen;