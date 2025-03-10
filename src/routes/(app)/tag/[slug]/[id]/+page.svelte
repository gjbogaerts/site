<script lang="ts">
	import { PostList } from '$components';

	interface Content {
		id: number;
		date: string;
		title: string;
		publication_date: string;
	}
	interface TagPageProps {
		data: {
			tag: string;
			content: Content[];
		};
	}

	const { data }: TagPageProps = $props();
	const content = $derived(data.content);
	const tag = $derived(data.tag);
</script>

<svelte:head>
	<title>{tag}-tag</title>
	<meta name="description" content={`Alle artikelen op raker.nl getagd met ${tag}`} />
	<meta name="keywords" content={tag} />
</svelte:head>

<h1 class="mb-m">
	Alle content getagd met <em>{tag}</em>
</h1>

<section>
	<PostList berichten={content} />
</section>
