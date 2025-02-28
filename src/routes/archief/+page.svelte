<script lang="ts">
	import type { Berichten } from './../../index.ts';
	import slugify from 'typescript-slugify';
	import { Pagination } from '$components';
	let { data } = $props();
	// $inspect(props);
	const totalCount = data.count;
	const currentPage = 1;
	let berichten: Berichten[] = data.data as unknown as Berichten[];
	// // $inspect(aantal);

	function getFirstParagraph(htmlString: string): string {
		const firstParagraphStart = htmlString.indexOf('<p>');
		const firstParagraphEnd = htmlString.indexOf('</p>');
		const firstParagraph = htmlString.slice(firstParagraphStart, firstParagraphEnd);
		return firstParagraph;
	}
	function getDatum(bericht: Berichten): string {
		if (bericht.publication_date != null) {
			return bericht.publication_date;
		}
		return bericht.date;
	}
</script>

<div class="archief">
	<Pagination {totalCount} {currentPage} />
	{#each berichten as bericht}
		<h2 class="mb-m">{bericht.title}</h2>
		<p class="mb-xs continue small-font">{getDatum(bericht)}</p>
		<p class="mb-xs">{@html getFirstParagraph(bericht.content)}</p>
		<p class="mb-l continue small-font">
			<a href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}>Lees verder</a>&nbsp;&hellip;
		</p>
	{/each}
	<Pagination {totalCount} {currentPage} />
</div>

<style>
	.continue {
		text-align: right;
	}
</style>
