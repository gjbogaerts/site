import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_PROJECT_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_PROJECT_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_SUPABASE_PROJECT_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	const response = await supabase
		.from('berichten')
		.select('id, title, date, publication_date')
		.order('date', { ascending: false })
		.eq('user_id', '33869a5d-6ab2-40e6-ba59-78a11bde0691')
		.range(0, 10);

	return { session, supabase, user, response };
};
