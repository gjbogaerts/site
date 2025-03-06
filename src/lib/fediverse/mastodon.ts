import { MASTODON_ACCESS_TOKEN, MASTODON_INSTANCE_URL } from '$env/static/private';
import { sanitizeStatusForMastodon } from '$lib/utils/strings';
export interface MastodonPost {
	id: string;
	content: string;
}

export async function postToMastodon(
	status: string,
	visibility: 'public' | 'private' | 'unlisted' | 'direct'
) {
	status = sanitizeStatusForMastodon(status);
	console.log(status);
	console.log('finished');
	// return { id: 1, content: 'niks' };
	const response = await fetch(`${MASTODON_INSTANCE_URL}/api/v1/statuses`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${MASTODON_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ status, visibility })
	});
	if (!response.ok) {
		throw new Error(
			'Failed to post to Mastodon - ' + response.status + ' - ' + response.statusText
		);
	}
	return response.json() as unknown as Promise<MastodonPost>;
}
