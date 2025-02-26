<script lang="ts">
	import type { Berichten } from '../index.js';

	let { data } = $props();
	let bericht = data.bericht;
	// $inspect(bericht);
	// console.log(bericht);

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

<article>
	<h1 class="mb-l">{bericht.title}</h1>
	<div class="meta-container">
		<div class="date tiny-font">
			{getDatum(bericht)}
		</div>
		<div class="tags small-font">Tag 1, tag 2</div>
	</div>
	{@html bericht.content}
</article>

<!-- 
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
{/each} -->

<style>
	article :global {
		p {
			margin: 2rem 0;
		}
	}
	.meta-container {
		display: flex;
		justify-content: space-between;
	}
	.meta {
		display: flex;
		justify-content: space-between;
	}
	.datum {
		font-style: italic;
	}
</style>
