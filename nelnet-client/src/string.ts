// Formats a date for the locale.
export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleString();
};
