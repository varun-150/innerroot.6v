export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
