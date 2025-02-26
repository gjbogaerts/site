<script lang="ts">
	import type { Berichten } from '../index.js';
	import slugify from 'typescript-slugify';

	let { data } = $props();
	let bericht: Berichten = data.bericht;

	// $inspect(bericht?.bericht_x_tag);
	// console.log(bericht);
	let tags = bericht?.tags;
	$inspect(tags);
	const processTags = (): string | undefined => {
		const tagLinks = tags?.map((tag) => {
			return `<a href="/tag/${slugify(tag.tag)}/${tag.tags.id}">${tag.tag}</a>`;
		});
		return tagLinks?.join(', ');
	};

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
		<div class="tags small-font">
			<!-- {#each } -->
			{@html processTags()}
		</div>
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
