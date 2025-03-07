import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';
import { getMastodonComments, type MastodonComment } from '$lib/fediverse/mastodon';

// export async function load:PageServerLoad({ params }) {
// 	let { data } = await supabase.from('berichten').select('*').eq('id', params.id).single();
// 	// console.log(data);
// 	return data;
// }
export const load: PageServerLoad = async ({ params }) => {
	const { data: bericht, error } = await supabase
		.from('berichten')
		.select(`*, tags:tags(tag, id)`)
		.eq('id', params.id)
		.single();
	// console.log(data);
	if (error) throw error;
	let comments: MastodonComment[] = [];
	// if (bericht.mastodon_post_id) {
	try {
		// const testid = '109869516945050838';
		comments = await getMastodonComments(bericht.mastodon_post_id);
	} catch (error) {
		console.error('Error fetching comments from Mastodon', error);
	}
	// }

	return { bericht, comments };
};
