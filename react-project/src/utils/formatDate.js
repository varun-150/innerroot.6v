export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };

    return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
};
