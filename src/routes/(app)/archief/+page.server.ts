import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let { data, error, count } = await supabase
		.from('berichten')
		.select(`id, title, publication_date`, {
			count: 'estimated'
		})
		.order('publication_date', { ascending: false });
	return { data, count };
};
