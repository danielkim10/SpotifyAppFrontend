import Button from "../components/common/Button";
import SpotifyLogo from "../assets/Spotify_logo_with_text.svg.png";
import GithubLogo from "../assets/Github.png";
import SocketIOLogo from "../assets/socketio.png";
import ReactLogo from "../assets/react.png";
import NodeJSLogo from "../assets/Node.js_logo.png";
import ExpressLogo from "../assets/Expressjs.png";
import MongoDBLogo from "../assets/mongoDB.png";
import TypeScriptLogo from "../assets/Typescript.png";
import YouTubeLogo from "../assets/YouTube.png";

const Login = () => {
    const login = async() => {
        window.location.replace("http://localhost:5000/api/auth/login");
    }

    document.title = "Socketfy"

    return (
        <div className="">
            <div className="p-2">
            <b className="text-9xl">Socketfy</b>
            </div>
            <div className="p-2">
                <b className="text-4xl">A real-time web application focusing on the collaborative creation of Spotify playlists</b>
            </div>
            <div className="w-max mx-auto my-[100px]">
                <Button label="Login" bgColorScheme="green" endIcon="login_rounded" handleClick={() => login()}/>
            </div>
            
            <table className="w-full mx-auto">
                <tbody>
                    <tr className="flex">
                        <td className="flex-1 col-span-3 my-5">
                            <b className="text-4xl">Additional Links</b>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-5">
                            <a href="https://developer.spotify.com/documentation/web-api" target="_blank" rel="noreferrer">
                                <img src={SpotifyLogo} alt="Spotify API Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://github.com/danielkim10/SpotifyAppFrontend" target="_blank" rel="noreferrer">
                                <img src={GithubLogo} alt="Github Repository" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://www.youtube.com/watch?v=WNACBp4g-jI" target="_blank" rel="noreferrer">
                                <img src={YouTubeLogo} alt="Demo" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Read the Spotify API documentation</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">View the repository on Github</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Watch a recorded demo on YouTube</p>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 col-span-3 mt-10 mb-5">
                            <b className="text-4xl">Tech Stack</b>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-5">
                            <a href="https://react.dev/" target="_blank" rel="noreferrer">
                                <img src={ReactLogo} alt="React Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                                <img src={TypeScriptLogo} alt="TypeScript Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://socket.io/" target="_blank" rel="noreferrer">
                                <img src={SocketIOLogo} alt="Socket IO Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Constructed with React and Material-UI</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Written in TypeScript</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Real-time communication built using Socket.IO</p>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-5">
                            <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
                                <img src={NodeJSLogo} alt="Node.js Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
                                <img src={ExpressLogo} alt="Express Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                        <td className="flex-1 text-center p-5">
                            <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
                                <img src={MongoDBLogo} alt="MongoDB Documentation" className="max-h-[80px] mx-auto"/>
                            </a>
                        </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Server created with Node.js</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Routing and middleware handled with Express</p>
                        </td>
                        <td className="flex-1 text-center p-2">
                            <p className="my-2">Data stored with MongoDB</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
}

export default Login;