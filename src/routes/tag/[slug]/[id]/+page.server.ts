import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { PostgrestError } from '@supabase/supabase-js';
export const load: PageServerLoad = async ({ params }) => {
	const { data, error } = await supabase
		.from('tags')
		.select(`*, content: berichten(id, title, publication_date, date)`)
		.eq('id', params.id)
		.single();
	if (error) {
		console.log(error);
		fail(400);
	}
	return data;
};
