<script lang="ts">
	import type { Berichten, Database } from '../index.js';
	import slugify from 'typescript-slugify';
	let { data } = $props();

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
	function sluggify(title: string) {
		return slugify(title);
	}
</script>

{#each data.berichten as bericht, index}
	{#if index == 0}
		<h1 class="mb-l">{bericht.title}</h1>
	{:else}
		<h2 class="mt-l mb-s">{bericht.title}</h2>
	{/if}
	{@html getFirstParagraph(bericht.content)}
	<div class="meta mb-m mt-s">
		<p class="datum small-font">{getDatum(bericht)}</p>
		<p class="link small-font">
			<a href={`/bericht/${sluggify(bericht.title)}/${bericht.id}`}>Lees verder</a>&hellip;
		</p>
	</div>
{/each}

<style>
	.meta {
		display: flex;
		justify-content: space-between;
	}
	.datum {
		font-style: italic;
	}
</style>
