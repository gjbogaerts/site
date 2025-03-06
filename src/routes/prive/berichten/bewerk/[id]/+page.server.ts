// import { supabase } from '$lib/supabaseClient';
import { redirect, fail } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_IMAGE_STORAGE } from '$env/static/public';
// import { setUserState } from '$lib/state/user-state.svelte.js';
// import { Marked } from '@ts-stack/markdown';

export const actions = {
	default: async (event: { request: any; locals?: any }) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		// console.log(supabase);

		const image = formData.get('image') as File;
		// console.log(image);
		// writeFileSync(`static/${image.name}`, Buffer.from(await image.arrayBuffer()));
		let imagePath = null;
		if (image !== null) {
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
		let tmp_id = formData.get('id') as string;
		const id = parseInt(tmp_id);
		let tags = formData.get('tags') as string;

		const tagArray = tags.split(',');
		let tagsToInsert = tagArray.map((tagNo) => {
			let tagValue = tagNo.trim().toLowerCase();
			if (tagValue === '') return null;
			return { tag: tagValue };
		});
		tagsToInsert = tagsToInsert.filter((value) => value !== null);
		// console.log(formData.FormData.title);
		//van markdown naar html:
		// let contentToSave = Marked.parse(content);
		// console.log(title, contentToSave, publication_date, status, user_id);
		const { response, error } = await supabase
			.from('berichten')
			.update({
				title,
				content,
				publication_date,
				status,
				user_id,
				image: imagePath
			})
			.eq('id', id);
		if (error) {
			fail(400, error);
		}
		// console.log(id);
		// we remove existing tags
		let removed = await supabase.from('bericht_x_tag').delete().eq('bericht_id', id);

		// console.log(removed);

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
		let tagsResult = await supabase.from('tags').select().in('tag', tagsToSearch);
		// and finally we instert postId and tagIds into cross-table
		// console.log(tags);
		if (tagsResult.error) {
			fail(400, tagsResult.error);
		}
		let tagsToCrossFile = tagsResult.data.map((val: any) => {
			return { bericht_id: id, tag: val.tag };
		});
		// console.log(tagsToCrossFile);
		let finalResult = await supabase.from('bericht_x_tag').insert(tagsToCrossFile);
		// console.log(finalResult);

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
