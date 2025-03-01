import * as Sentry from '@sentry/sveltekit';
import type { HandleClientError } from '@sveltejs/kit';

Sentry.init({
	dsn: 'https://8b461a91e173f632b3f51cf911ac4560@o4508902956597248.ingest.de.sentry.io/4508902959218768',
	tracesSampleRate: 1
});
export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();

	// example integration with https://sentry.io/
	Sentry.captureException(error, {
		extra: { event, errorId, status }
	});

	return {
		message: 'Whoops!',
		errorId
	};
};
