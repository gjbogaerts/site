import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	let { data } = await supabase.from('berichten').select('*').eq('id', params.id).single();
	// console.log(data);
	return data;
}
