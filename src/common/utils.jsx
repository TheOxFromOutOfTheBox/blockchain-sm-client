export const upperFirstLowerRest = (str) => {
    const head = (str[0] || "").toUpperCase();
    const rest = str.slice(1).toLowerCase();
    return head + rest;
};

export const camelCaseToTitleCase = (str) => {
    let capitalCharRe = /[A-Z]/g;
    const head = (str[0] || "").toUpperCase();
    const rest = str.slice(1).replace(capitalCharRe, " $&");
    return head + rest;
};