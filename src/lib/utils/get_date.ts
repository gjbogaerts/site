export const getDatum = (bericht: any): string => {
	let datum = bericht.publication_date;
	let datumParts = datum.split('-');
	const jaar = datumParts[0];
	const maand = datumParts[1];
	const dag = datumParts[2];
	return `${dag}-${maand}-${jaar}`;
};
