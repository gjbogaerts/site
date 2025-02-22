import { supabase } from '$lib/supabaseClient';

export async function load() {
	// console.log(supabase);
	const { data, error } = await supabase
		.from('berichten')
		.select('*')
		.range(0, 9)
		.order('date', { ascending: false })
		.eq('user_id', 'c698a9f1-8a7f-4be5-b681-f136fd82fb9e');
	return {
		berichten: data ?? []
	};
}
