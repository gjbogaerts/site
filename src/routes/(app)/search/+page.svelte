<script lang="ts">
	import { PostList } from '$components';

	const { data } = $props();
	interface SearchResults {
		id: number;
		title: string;
		publication_date: string;
		date: string;
	}
	let results: SearchResults[] = $state([]);
	if (data.data && data.data.length > 0) {
		results = data.data;
	}
</script>

<svelte:head>
	<title>Raker | zoekresultaten voor {data.rawQ}</title>
	<meta name="description" content={`${results[0]?.title || 'Geen resultaten'}`} />
	<meta name="keywords" content="Raker, Big Tech, PublicSpaces, Digitale samenleving" />
</svelte:head>

<h1 class="mb-m">Zoekresultaten voor "<em>{data.rawQ}</em>"</h1>
<p class="mb-s">Er zijn {data.count} resultaten voor deze zoekterm gevonden.</p>

<PostList berichten={results} />
