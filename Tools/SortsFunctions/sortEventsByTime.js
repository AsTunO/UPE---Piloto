function sortEventsByTime(sequence) {
    return sequence.sort((a, b) => +a.t - +b.t);
}

export default sortEventsByTime