const Login = () => {
    const login = async() => {
        window.location.replace("http://localhost:5000/api/auth/login");
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <button onClick={() => login()}>
                Login
            </button>
        </div>
    );
}

export default Login;