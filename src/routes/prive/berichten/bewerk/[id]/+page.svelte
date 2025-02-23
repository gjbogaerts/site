<script lang="ts">
	import { DashboardHeader, PostForm } from '$components';
	let { data } = $props();
	// $inspect(data);
	console.log(data.user_id, data.title, data.id);
	let { user_id, title, content, publication_date, status, id } = data;
</script>

<DashboardHeader />
<h1 class="mt-l mb-m">Bericht bewerken</h1>
<PostForm user={user_id} {title} {content} {publication_date} {status} {id} />
