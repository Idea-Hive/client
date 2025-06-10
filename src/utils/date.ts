import moment from "moment";

export const calculateDday = (expirationDate: string): string => {
    const today = moment().startOf("day");
    const expiration = moment(expirationDate).startOf("day");
    const diffDays = expiration.diff(today, "days");

    if (diffDays < 0) {
        return "만료됨";
    } else if (diffDays === 0) {
        return "D-Day";
    } else {
        return `D-${diffDays}`;
    }
};
