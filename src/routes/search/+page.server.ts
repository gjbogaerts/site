import type { PageServerLoad } from '../$types';
import { supabase } from '$lib/supabaseClient';
export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams;
	// console.log(searchParams.values());
	// for (const p of searchParams) {
	// console.log(searchParams.getAll('q')[0]);
	const rawQ = searchParams.getAll('q')[0];
	const q = rawQ.replaceAll(/\s+/g, '+');
	// return { q };
	const { data, error, count } = await supabase
		.from('berichten')
		.select('id, title, date, publication_date', { count: 'estimated' })
		.textSearch('content', q)
		.order('date', { ascending: false });

	// console.log(count);
	// console.log(data);
	// console.log(error);
	return { count, data, error, rawQ };
	// }
};
