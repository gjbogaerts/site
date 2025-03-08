import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PostgrestError } from '@supabase/supabase-js';
export const load: PageServerLoad = async ({ params }) => {
	const page = parseInt(params.page);
	const startNum = page * 10;
	const endNum = startNum + 9;
	const { data, error, count } = await supabase
		.from('berichten')
		.select('*', { count: 'estimated' })
		.order('date', { ascending: false })
		.range(startNum, endNum);
	if (error) {
		console.log(error);
		fail(400);
	}
	return {
		data: data,
		count: count,
		currentPage: page
	};
};
