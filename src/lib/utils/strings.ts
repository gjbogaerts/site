import slugify from 'typescript-slugify';

export const getDatum = (bericht: any): string => {
	let datum = bericht.publication_date;
	let datumParts = datum.split('-');
	const jaar = datumParts[0];
	const maand = datumParts[1];
	const dag = datumParts[2];
	return `${dag}-${maand}-${jaar}`;
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
