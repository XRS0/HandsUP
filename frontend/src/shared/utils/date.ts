const weekdays = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday",
    "Saturday"
]

export function getTime(timestamp: number | Date) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

export function getDayStart(timestamp: number | Date) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    return date;
}

export function getDateLocaleString(date: Date | number, hasYear = true, hasFullMonth = true) {
    return new Date(date).toLocaleString("en-US", {
        year: hasYear ? "numeric" : undefined,
        month: hasFullMonth ? "long" : "short",
        day: "numeric"
    });
}

export function getShort(str: string) {
    return str.substring(0, 3);
}

export function getFlexDate(timestamp: number | Date, noTime?: boolean) {
    const date = new Date(timestamp);
    const dateStart = getDayStart(date);

    const today = getDayStart(new Date());
    if (dateStart.getTime() == today.getTime()) return noTime ? "Today" : getTime(timestamp);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (dateStart.getTime() == yesterday.getTime()) return "Yesterday";

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    if (date >= weekAgo) return noTime ? weekdays[date.getDay()] : getShort(weekdays[date.getDay()]);

    const hasYear = date.getFullYear() !== today.getFullYear();
    return getDateLocaleString(timestamp, hasYear, noTime);
}

export const upperFirst = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

const getMinutes = (timestamp: number | Date) => {
    return Math.floor((Date.now() - Number(timestamp)) / 1000 / 60);
}

export function getDateAgo(timestamp: number | Date, noTime?: boolean) {
    const date = new Date(timestamp);
    const dateStart = getDayStart(date);

    const today = getDayStart(new Date());
    if (dateStart.getTime() == today.getTime()) {
        if (noTime) return "Today"
        let minutes = getMinutes(timestamp);
        return `${minutes > 60 ? `${Math.floor(minutes / 60)} hours` : `${minutes} minutes`} ago`;
    }

    const dayAgo = new Date(today);
    dayAgo.setDate(today.getDate() - 7);
    if (date >= dayAgo) {
        if (noTime) return weekdays[date.getDay()];
        let days = Math.floor(getMinutes(timestamp) / 60 / 24);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    // const weekAgo = new Date(today);
    // weekAgo.setDate(today.getDate() - 7);
    // if (date >= weekAgo) return noTime ? weekdays[date.getDay()] : getShort(weekdays[date.getDay()]);

    // const hasYear = date.getFullYear() !== today.getFullYear();
    // return getDateLocaleString(timestamp, hasYear, noTime);

    // дописать недели
}