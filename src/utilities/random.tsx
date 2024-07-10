import ArtistInterface from '../interfaces/artist';

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

export const relativeDateFormatter = (date: string) => {
    let currentDay = daysIntoYear(new Date());
    let referenceDay = daysIntoYear(new Date(date));

    if (currentDay - referenceDay === 0) {
        return "Today";
    }
    else if (currentDay - referenceDay === 1) {
        return "Yesterday";
    }
    else {
        return `${currentDay - referenceDay} days ago`;
    }
}

const daysIntoYear = (date: Date) => {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}