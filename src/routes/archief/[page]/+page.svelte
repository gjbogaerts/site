<script lang="ts">
	import type { Berichten } from './../../../index';
	import slugify from 'typescript-slugify';
	import { Pagination } from '$components';

	import { getDatum } from '$lib/utils/get_date';

	let { data } = $props();
	// $inspect(data.count);
	// $inspect(data.currentPage);
	// $inspect(data.data);

	let berichten: Berichten[] = $derived(data.data) as Berichten[];
	let totalCount = data.count;
	let currentPage = $derived(data.currentPage);
	// // $inspect(aantal);

	function getFirstParagraph(htmlString: string): string {
		const firstParagraphStart = htmlString.indexOf('<p>');
		const firstParagraphEnd = htmlString.indexOf('</p>');
		const firstParagraph = htmlString.slice(firstParagraphStart, firstParagraphEnd);
		return firstParagraph;
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
