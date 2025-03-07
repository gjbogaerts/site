import { supabase } from '$lib/supabaseClient';
import { getMastodonComments, type MastodonComment } from '$lib/fediverse/mastodon';

// import { fail } from '@sveltejs/kit';

// interface BerichtReturnData {
// 	id: number;
// 	title: string;
// 	content: string;
// 	date: string;
// 	publication_date: string;
// 	tags: Tag[];
// }

// interface Tag {
// 	tag: string;
// 	tags: { id: number; tag: string }[];
// }

export async function load() {
	// console.log(supabase);
	const { data: bericht, error } = await supabase
		.from('berichten')
		.select(
			`id, title, content, date, publication_date, image, mastodon_post_id, tags:tags(tag, id)`
		)
		.order('publication_date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691')
		.limit(1)
		.single();
	if (error) throw error;
	let comments: MastodonComment[] = [];
	if (bericht.mastodon_post_id !== null) {
		try {
			// const testid = '109869516945050838';
			comments = await getMastodonComments(bericht.mastodon_post_id);
		} catch (error) {
			console.error('Error fetching comments from Mastodon', error);
		}
	}
	// console.log(data);

	// console.log(error);
	return {
		bericht,
		comments
	};
}
