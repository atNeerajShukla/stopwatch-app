const formatTime = (time: number): string => {
    // (time / 60000) gives us the total minutes, and % 60 ensures it's within 00-59.
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    // We add a "0" at the start, then slice(-2) to ensure it's always two digits.
    const formattedMinutes = ("0" + minutes).slice(-2);
    const formattedSeconds = ("0" + seconds).slice(-2);
    const formattedMilliseconds = ("0" + milliseconds).slice(-2);

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

export { formatTime };



