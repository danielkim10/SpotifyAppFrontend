const Login = () => {
    const login = async() => {
        // const res = await fetch("http://localhost:5000/api/auth/login", {
        //     method: "GET", headers: { "Content-Type": "application/x-www-form-urlencoded" }
        // });
        // const json = await res.json();
        // if (res.ok) {
        //     console.log(json);
        // }
        // else {
        //     console.log(json.error);
        // }
        window.location.replace("http://localhost:5000/api/auth/login");
    }

    return (
        <div id="login" className="login">
            <h2>Spockify</h2>
            <h3>A real-time web application</h3>
            <h4>Application Stack</h4>
            <h5>Frontend</h5>
                <p>React | TypeScript | Socket.IO</p>
            <h5>Backend</h5>
                <p>Node.js | Express | MongoDB </p>
            <p>Github link</p>
            <p>Spofiy API documentation</p>
            <button onClick={() => login()}>
                Login
            </button>
        </div>
    );
}

export default Login;