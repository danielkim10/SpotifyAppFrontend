interface CurrentTrack {
    album: {
        images: {
            height?: number | null | undefined,
            size?: string | null | undefined,
            url: string,
            width?: number | null | undefined
        }[],
        name: string,
        uri: string
    },
    artists: {
        name: string,
        uri: string,
        url: string
    }[],
    duration_ms: number,
    id: string | null,
    media_type: string,
    name: string,
    track_type: string,
    type: string,
    uid: string,
    uri: string
};

export default CurrentTrack;