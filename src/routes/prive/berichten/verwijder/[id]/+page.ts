import { supabase } from '$lib/supabaseClient';
interface DeleteReturnData {
	id: number;
	title: string;
}
export async function load({ params }) {
	let { data } = await supabase.from('berichten').select('title, id').eq('id', params.id).single();

	// console.log(data as DeleteReturnData);
	return data as DeleteReturnData;
}
