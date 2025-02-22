import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';
// import type { RequestEvent } from '../../$types';
// import type { Actions } from '../../$types';
// console.log('actions');

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		// console.log(data);
		// console.log(error);
		if (error || !data.user) {
			return fail(400, { error });
		}
		redirect(303, '/prive/dashboard');
	}
};
