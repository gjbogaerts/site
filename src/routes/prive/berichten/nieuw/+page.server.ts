// import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
// import { setUserState } from '$lib/state/user-state.svelte.js';
import { Marked } from '@ts-stack/markdown';

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
		const image = formData.get('image') as File;
		// console.log(image);
		// writeFileSync(`static/${image.name}`, Buffer.from(await image.arrayBuffer()));

		const uploadResponse = await supabase.storage
			.from('images')
			.upload(`${Math.random()}_${image.name}`, image);
		if (uploadResponse.error != null) {
			fail(400, { message: 'Image upload werkte niet' });
		}
		// console.log(uploadResponse);
		const imagePath = PUBLIC_SUPABASE_IMAGE_STORAGE + uploadResponse.data.fullPath;
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const publication_date = formData.get('publication_date') as Date;
		const status = formData.get('status') as string;
		const user_id = formData.get('user_id') as string;
		const tags = formData.get('tags') as string;

		const tagArray = tags.split(',');
		const tagsToInsert = tagArray.map((tagNo) => {
			let tagValue = tagNo.trim();
			return { tag: tagValue };
		});
		// console.log(tagsToInsert);

		// console.log(formData.FormData.title);
		//van markdown naar html:
		let contentToSave = Marked.parse(content);
		// console.log(title, contentToSave, publication_date, status, user_id);
		let { error, data } = await supabase
			.from('berichten')
			.insert({
				title,
				content: contentToSave,
				publication_date,
				status,
				user_id,
				image: imagePath
			})
			.select();

		if (error) {
			fail(400, error);
		}
		// console.log(data);
		if (data) {
			let newPostId = data[0].id;
			// console.log(`New Post: ${newPostId}`);
			// console.log(tagsToInsert);
			let tagResult = await supabase.from('tags').upsert(tagsToInsert, { ignoreDuplicates: true });

			if (tagResult.error) {
				fail(400, tagResult.error);
			}
			// now we select all given tags, and use the post id to link them together
			let tagsToSearch = tagsToInsert.map((val) => {
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
		// console.log(result.data);
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
