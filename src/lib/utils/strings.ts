import slugify from 'typescript-slugify';

export const getDatum = (bericht: any): string => {
	let datum = bericht.publication_date;
	let datumParts = datum.split('-');
	const jaar = datumParts[0];
	const maand = datumParts[1];
	const dag = datumParts[2];
	return `${dag}-${maand}-${jaar}`;
};

export const convertDatetime = (datetimeStr: string): string => {
	const dt = new Date(datetimeStr);
	const pad = (n: number) => (n < 10 ? '0' + n : n);
	const day = pad(dt.getUTCDate());
	const month = pad(dt.getUTCMonth() + 1);
	const year = dt.getUTCFullYear().toString().slice(-2); // Get last two digits of year
	const hours = pad(dt.getUTCHours());
	const minutes = pad(dt.getUTCMinutes());

	return `${day}-${month}-${year}, ${hours}:${minutes}`;
};

export const processTags = (tags: any): string | undefined => {
	const tagLinks = tags?.map((tag: any) => {
		return `<a href="/tag/${slugify(tag.tag)}/${tag.id}">${tag.tag}</a>`;
	});
	return tagLinks?.join(', ');
};

export const getTagString = (tags: any): string => {
	return tags?.map((tag: any) => tag.tag).join(', ');
};

export const getFirstParagraph = (htmlString: string): string => {
	const firstParagraphStart = htmlString.indexOf('<p>');
	const firstParagraphEnd = htmlString.indexOf('</p>');
	const firstParagraph = htmlString.slice(firstParagraphStart, firstParagraphEnd);
	return firstParagraph;
};

export function sanitizeStatusForMastodon(status: string): string {
	// Remove leading and trailing whitespace
	let sanitizedStatus = status.trim();

	// Replace multiple spaces with a single space
	sanitizedStatus = sanitizedStatus.replace(/\s+/g, ' ');

	// Escape special characters
	sanitizedStatus = sanitizedStatus
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

	// Ensure the status length is within Mastodon's limit (500 characters)
	if (sanitizedStatus.length > 500) {
		sanitizedStatus = sanitizedStatus.substring(0, 500);
	}

	return sanitizedStatus;
}
