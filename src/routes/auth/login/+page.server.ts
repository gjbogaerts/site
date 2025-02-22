// import type { Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';
// console.log('actions');

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error || !data.user) {
			return fail(400, { error });
		}
		redirect(303, '/prive/dashboard');
	}
};
