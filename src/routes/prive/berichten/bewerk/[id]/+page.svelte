<script lang="ts">
	import { DashboardHeader, PostForm } from '$components';

	interface tagObject {
		tag: string;
	}
	let { data } = $props();
	// $inspect(data);
	// console.log(data.user_id, data.title, data.id);
	let { user_id, title, content, publication_date, status, id, tags } = data;
	let tagValues: string = $state('');
	let tagArray = [];
	if (tags != null) {
		tagArray = tags.map((tag: tagObject) => tag.tag);
		tagValues = tagArray.join(', ');
		// console.log(tags);
	}
</script>

<DashboardHeader />
<h1 class="mt-l mb-m">Bericht bewerken</h1>
<PostForm user={user_id} {title} {content} {publication_date} {status} {id} tags={tagValues} />
