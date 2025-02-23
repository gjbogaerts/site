// import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';
import { setUserState } from '$lib/state/user-state.svelte.js';
import { Marked } from '@ts-stack/markdown';

export const actions = {
	default: async (event: { request: any; locals?: any }) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		// console.log(supabase);

		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const publication_date = formData.get('publication_date') as Date;
		const status = formData.get('status') as string;
		const user_id = formData.get('user_id') as string;

		// console.log(formData.FormData.title);
		//van markdown naar html:
		let contentToSave = Marked.parse(content);
		// console.log(title, contentToSave, publication_date, status, user_id);
		const { response, error } = await supabase.from('berichten').insert({
			title,
			content: contentToSave,
			publication_date,
			status,
			user_id
		});
		if (error) {
			fail(400, error);
		}
		redirect(303, '/prive/dashboard');
	}
};

/*
Formulier test tekst
# Kop

Een lijst:
1. Een
2. Twee
3. Drie

En ongeordend:
- een
- twee
- drie

__vet of cursief__
*vet of cursief*

## Tussenkop
Beetje spelen
*/
