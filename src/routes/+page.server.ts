import { supabase } from '$lib/supabaseClient';

export async function load() {
	// console.log(supabase);
	const { data, error } = await supabase
		.from('berichten')
		.select('*')
		.range(0, 9)
		.order('date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691');
	return {
		berichten: data ?? []
	};
}
