import type { PageLoad } from '../$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageLoad = async (event) => {
	const { data, error } = await supabase
		.from('berichten')
		.select('id, title, publication_date')
		.order('publication_date', { ascending: false })
		.limit(10);
	const { data: stickies, error: stickyerror } = await supabase
		.from('berichten')
		.select('id, title, publication_date')
		.order('publication_date', { ascending: false })
		.eq('sticky', true);
	return { berichten: data, stickies, error };
};
