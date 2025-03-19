import { supabase } from '$lib/supabaseClient';
import { error as fout } from '@sveltejs/kit';

export async function load({ params }) {
	let { data: bericht, error: berichterror } = await supabase
		.from('berichten')
		.select(`*, tags(tag)`)
		.eq('id', params.id)
		.single();
	if (berichterror) {
		fout(400, { message: 'Fout bij het laden van het bericht' });
	}

	let { data: taglist, error: taglisterror } = await supabase
		.from('tags')
		.select('tag')
		.order('tag', { ascending: true });

	if (taglisterror) {
		fout(400, { message: 'Fout bij het laden van de taglist' });
	}

	return { bericht, taglist };
}
