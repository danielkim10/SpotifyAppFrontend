export const convertMillisecondsToMinutes = (duration_ms: number) => {
    return Math.floor(duration_ms / 1000 / 60);
}

export const convertMillisecondsToSeconds = (duration_ms: number) => {
    return Math.round((duration_ms / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false});
}