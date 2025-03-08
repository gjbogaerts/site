import * as Sentry from '@sentry/sveltekit';
import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_PROJECT_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

Sentry.init({
	dsn: 'https://8b461a91e173f632b3f51cf911ac4560@o4508902956597248.ingest.de.sentry.io/4508902959218768',
	tracesSampleRate: 1,
	enabled: process.env.NODE_ENV === 'production'
});

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_PROJECT_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				/**
				 * SvelteKit's cookies API requires `path` to be explicitly set in
				 * the cookie options. Setting `path` to `/` replicates previous/
				 * standard behavior.
				 */
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, { ...options, path: '/' });
					});
				}
			}
		}
	);

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	if (!event.locals.session && event.url.pathname.startsWith('/prive')) {
		// console.log('something wrong');
		redirect(303, '/auth/login');
	}

	if (event.locals.session && event.url.pathname === '/auth/login') {
		redirect(303, '/prive/dashboard');
	}

	return resolve(event);
};

export const handleError: HandleServerError = Sentry.handleErrorWithSentry(
	async ({ error, event, status, message }) => {
		const errorId = crypto.randomUUID();
		Sentry.captureException(error, { extra: { event, errorId, status } });
		return {
			message:
				'Oei, er is een fout opgetreden. Excuus, we proberen dit zo snel mogelijk te repareren.',
			errorId
		};
	}
);

export const handle: Handle = sequence(Sentry.sentryHandle(), sequence(supabase, authGuard));
