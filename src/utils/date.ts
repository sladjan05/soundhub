export function timeAgo(date: Date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (seconds < minute) {
        return 'just now';
    } else if (seconds < hour) {
        const minutes = Math.floor(seconds / minute);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (seconds < day) {
        const hours = Math.floor(seconds / hour);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (seconds < week) {
        const days = Math.floor(seconds / day);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (seconds < 6 * week) {
        const weeks = Math.floor(seconds / week);
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (seconds < year) {
        const months = Math.floor(seconds / month);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        const years = Math.floor(seconds / year);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}

export function timeAgoShort(date: Date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (seconds < minute) {
        return 'now';
    } else if (seconds < hour) {
        const minutes = Math.floor(seconds / minute);
        return `${minutes} min`;
    } else if (seconds < day) {
        const hours = Math.floor(seconds / hour);
        return `${hours}h`;
    } else if (seconds < week) {
        const days = Math.floor(seconds / day);
        return `${days}d`;
    } else if (seconds < 6 * week) {
        const weeks = Math.floor(seconds / week);
        return `${weeks}w`;
    } else if (seconds < year) {
        const months = Math.floor(seconds / month);
        return `${months}mo`;
    } else {
        const years = Math.floor(seconds / year);
        return `${years}y`;
    }
}
