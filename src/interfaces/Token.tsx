interface Token {
    access_token: string,
    refresh_token: string,
    setAccessToken: (t: string) => void
};

export default Token;