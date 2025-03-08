import { supabase } from '$lib/supabaseClient';
import type { QueryData } from '@supabase/supabase-js';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const frontpageQuery = supabase
		.from('berichten')
		.select('*, tags:tags(tag, id)')
		.order('publication_date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691')
		.gt('publication_date', '2025-01-01') // alleen de berichten van Raker nieuwe stijl
		.range(0, 10);

	type FrontpageBerichten = QueryData<typeof frontpageQuery>;
	const { data, error } = await frontpageQuery;
	const frontpageBerichten: FrontpageBerichten = data as any;
	return { frontpageBerichten, error };
};
