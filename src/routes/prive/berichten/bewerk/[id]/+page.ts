import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ params }) {
	let { data, error } = await supabase.from('berichten').select('*').eq('id', params.id).single();
	// console.log(data);
	if (error) {
		redirect(400, error.message);
	}
	return data;
}
