import { supabase } from '$lib/supabaseClient';

export async function load() {
	// console.log(supabase);
	const { data, error } = await supabase
		.from('berichten')
		.select('*')
		.range(0, 10)
		.eq('user_id', 'c698a9f1-8a7f-4be5-b681-f136fd82fb9e');
	console.log(error);
	console.log(data);
	return {
		berichten: data ?? []
	};
}
