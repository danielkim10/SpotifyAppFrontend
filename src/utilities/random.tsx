import ArtistInterface from "../interfaces/artist";

export const generateRoomCode = (length: number) => {
    var code = '';
    const alphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (var i = 0; i < length; i++) {
        code += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length));
    }
    return code;
}

export const formatMultipleArtists = (artists: ArtistInterface[]) => {
    var artistsFormatted = artists[0].name;
    for (var i = 1; i < artists.length; i++) {
        artistsFormatted += `, ${artists[i].name}`;
    }
    return artistsFormatted;
}