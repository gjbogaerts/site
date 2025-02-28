import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

// export async function load:PageServerLoad({ params }) {
// 	let { data } = await supabase.from('berichten').select('*').eq('id', params.id).single();
// 	// console.log(data);
// 	return data;
// }
export const load: PageServerLoad = async ({ params }) => {
	const data = await supabase
		.from('berichten')
		.select(`*, tags:tags(tag, id)`)
		.eq('id', params.id)
		.single();
	// console.log(data);
	return data;
};
