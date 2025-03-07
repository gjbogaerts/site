<script lang="ts">
	import { Article, Comments } from '$components';
	let { data } = $props();
	let { bericht, comments } = $derived(data);
</script>

<Article {bericht} />
{#if bericht.mastodon_post_id !== null}
	<Comments {bericht} {comments} />
{/if}
