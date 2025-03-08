import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let { data, error, count } = await supabase
		.from('berichten')
		.select(`id, title, content, date, publication_date, tags:bericht_x_tag (tag, tags(id))`, {
			count: 'estimated'
		})
		.range(0, 9)
		.order('date', { ascending: false });
	return { data, count };
};
