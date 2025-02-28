<script lang="ts">
	import slugify from 'typescript-slugify';
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
	const getDatum = function (bericht: SearchResults): string {
		if (bericht.publication_date !== null) {
			return bericht.publication_date;
		}
		return bericht.date;
	};
</script>

<h1 class="mb-m">Zoekresultaten voor "<em>{data.q}</em>"</h1>
<p class="mb-s">Er zijn {data.count} resultaten voor deze zoekterm gevonden.</p>
<ol>
	{#each results as bericht}
		<li>
			<a href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}> {bericht.title}</a>
			<span class="datum small-font mb-s">{getDatum(bericht)}</span>
		</li>
	{/each}
</ol>

<style>
	ol,
	li {
		list-style-type: decimal;
	}
	.datum {
		display: block;
		text-align: right;
	}
</style>
