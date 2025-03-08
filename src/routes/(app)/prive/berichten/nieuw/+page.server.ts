// import { supabase } from '$lib/supabaseClient';
import { MASTODON_VISIBILITY, ENVIRONMENT } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';
// import { Marked } from '@ts-stack/markdown';
import { postToMastodon, type MastodonPost } from '$lib/fediverse/mastodon';
import slugify from 'typescript-slugify';
import { PUBLIC_SUPABASE_IMAGE_STORAGE } from '$env/static/public';

export const actions = {
	default: async (event: { request: any; locals?: any }) => {
		const {
			request,
			locals: { supabase }
		} = event;

		const formData = await request.formData();
		// console.log(supabase);
		// console.log(formData);
		let imagePath = null;

		const image = formData.get('image') as File;
		if (image.size > 0 && image.name != '') {
			// console.log(image);
			// writeFileSync(`static/${image.name}`, Buffer.from(await image.arrayBuffer()));

			const uploadResponse = await supabase.storage
				.from('images')
				.upload(`${Math.random()}_${image.name}`, image);
			if (uploadResponse.error != null) {
				fail(400, { message: 'Image upload werkte niet' });
			}
			// console.log(uploadResponse);
			imagePath = PUBLIC_SUPABASE_IMAGE_STORAGE + uploadResponse.data.fullPath;
		}
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const publication_date = formData.get('publication_date') as Date;
		const status = formData.get('status') as string;
		const user_id = formData.get('user_id') as string;
		const mastodon_summary = formData.get('mastodon_summary') as string;
		const tags = formData.get('tags') as string;

		const tagArray = tags.split(',');
		let tagsToInsert = tagArray.map((tagNo) => {
			let tagValue = tagNo.trim().toLowerCase();
			if (tagValue === '') return null;
			return { tag: tagValue };
		});
		tagsToInsert = tagsToInsert.filter((value) => value !== null);
		// console.log(tagsToInsert);

		// console.log(formData.FormData.title);
		//van markdown naar html:
		// let contentToSave = Marked.parse(content);
		// console.log(title, contentToSave, publication_date, status, user_id);
		let { data, error } = await supabase
			.from('berichten')
			.insert({
				title,
				content,
				publication_date,
				status,
				user_id,
				mastodon_summary,
				image: imagePath
			})
			.select();
		// console.log(error);
		// console.log(data);
		if (error) {
			fail(400, error);
		}
		let newPostId: number = 0;
		// console.log(data);
		if (data) {
			newPostId = data[0].id;
			// console.log(`New Post: ${newPostId}`);
			// console.log(tagsToInsert);
			let tagResult = await supabase.from('tags').upsert(tagsToInsert, { ignoreDuplicates: true });

			if (tagResult.error) {
				fail(400, tagResult.error);
			}
			// now we select all given tags, and use the post id to link them together
			let tagsToSearch = tagsToInsert.map((val) => {
				if (val === null || val === undefined) return;
				return val.tag;
			});
			let tags = await supabase.from('tags').select().in('tag', tagsToSearch);
			// and finally we instert postId and tagIds into cross-table
			// console.log(tags);
			if (tags.error) {
				fail(400, tags.error);
			}
			let tagsToCrossFile = tags.data.map((val: any) => {
				return { bericht_id: newPostId, tag: val.tag };
			});
			// console.log(tagsToCrossFile);
			let finalResult = await supabase.from('bericht_x_tag').insert(tagsToCrossFile);
			// console.log(finalResult);
		}

		//OK, alles is geïnsert, we gaan nu Mastodon inlichten.
		if (newPostId === 0) {
			redirect(303, '/prive/dashboard');
		} else {
			if (ENVIRONMENT !== 'dev') {
				const url = `https://raker.nl/bericht/${slugify(title)}/${newPostId}`;
				const mastodonStatus = `Nieuw bericht op mijn blog ${url}: ${title} - ${mastodon_summary}`;
				// console.log(mastodonStatus);
				try {
					const mastodonPost: MastodonPost = await postToMastodon(
						mastodonStatus,
						MASTODON_VISIBILITY as 'public' | 'unlisted' | 'private' | 'direct'
					);
					// console.log('Succesfully posted to Mastodon');
					await supabase
						.from('berichten')
						.update({ mastodon_post_id: mastodonPost.id })
						.eq('id', newPostId);
				} catch (error) {
					console.log(error);
				}
			}

			// console.log(result.data);
			redirect(303, '/prive/dashboard');
		}
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
