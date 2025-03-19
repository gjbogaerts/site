import { supabase } from '$lib/supabaseClient';
import { error as fout } from '@sveltejs/kit';

export async function load() {
	let { data, error } = await supabase.from('tags').select('tag').order('tag', { ascending: true });
	if (error) {
		fout(400, { message: 'Fout bij het laden van de taglijst' });
	}
	return { data };
}
