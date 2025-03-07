import { MASTODON_ACCESS_TOKEN, MASTODON_INSTANCE_URL } from '$env/static/private';
import { sanitizeStatusForMastodon } from '$lib/utils/strings';
export interface MastodonPost {
	id: string;
	content: string;
}
export interface MastodonComment {
	id: string;
	content: string;
	account: {
		username: string;
		url: string;
	};
	created_at: string;
}

export interface MastodonContext {
	descendants: MastodonComment[];
}

export async function postToMastodon(
	status: string,
	visibility: 'public' | 'private' | 'unlisted' | 'direct'
) {
	status = sanitizeStatusForMastodon(status);
	// console.log(status);
	// console.log('finished');
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

export async function getMastodonComments(postId: string) {
	// console.log(postId);
	const response = await fetch(`${MASTODON_INSTANCE_URL}/api/v1/statuses/${postId}/context`, {
		headers: {
			Authorization: `Bearer ${MASTODON_ACCESS_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch comments from Mastodon');
	}

	const data: MastodonContext = await response.json();
	return data.descendants; // List of comments
}
