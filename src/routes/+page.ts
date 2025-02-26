import { supabase } from '$lib/supabaseClient';
// import { fail } from '@sveltejs/kit';

export async function load() {
	// console.log(supabase);
	const { data, error } = await supabase
		.from('berichten')
		.select('*')
		.order('date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691')
		.limit(1)
		.single();

	// console.log(data);
	// console.log(error);
	return {
		bericht: data ?? null
	};
}
