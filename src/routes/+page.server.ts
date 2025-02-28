import { supabase } from '$lib/supabaseClient';
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
	const { data, error } = await supabase
		.from('berichten')
		.select(`id, title, content, date, publication_date, tags:tags(tag, id)`)
		.order('date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691')
		.limit(1)
		.single();

	// console.log(data);

	// console.log(error);
	return {
		bericht: data ?? null
	};
}
