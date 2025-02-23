import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	let { data } = await supabase.from('berichten').select('title, id').eq('id', params.id).single();
	// console.log(data);
	return data;
}
