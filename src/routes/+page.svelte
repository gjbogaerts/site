<script lang="ts">
	// import type { Berichten } from '../index.js';
	import { getDatum } from '$lib/utils/get_date';
	import slugify from 'typescript-slugify';

	let { data } = $props();
	let bericht = $state(data.bericht);

	// $inspect(bericht?.bericht_x_tag);
	// console.log(bericht);
	let tags = bericht!.tags;
	// $inspect(tags);
	const processTags = (): string | undefined => {
		const tagLinks = tags?.map((tag) => {
			return `<a href="/tag/${slugify(tag.tag)}/${tag.id}">${tag.tag}</a>`;
		});
		return tagLinks?.join(', ');
	};

	function getFirstParagraph(htmlString: string): string {
		const firstParagraphStart = htmlString.indexOf('<p>');
		const firstParagraphEnd = htmlString.indexOf('</p>');
		const firstParagraph = htmlString.slice(firstParagraphStart, firstParagraphEnd);
		return firstParagraph;
	}
</script>

<article>
	<h1 class="mb-l">{bericht!.title}</h1>
	<div class="meta-container">
		<div class="date tiny-font">
			{getDatum(bericht!)}
		</div>
		<div class="tags small-font">
			<!-- {#each } -->
			{@html processTags()}
		</div>
	</div>
	<div class="content">
		{#if bericht!.image !== null}
			<img class="feature" src={bericht!.image} alt={`Illustratie bij ${bericht!.title}`} />
		{/if}
		{@html bericht!.content}
	</div>
</article>

<style>
	article :global {
		p {
			margin: 2rem 0;
		}
	}

	.content .feature {
		width: 100%;
		float: none;
	}

	.content img {
		float: left;
		width: 40%;
		margin: 1rem 2rem;
	}
	.meta-container {
		display: flex;
		justify-content: space-between;
	}
	/* .meta {
		display: flex;
		justify-content: space-between;
	}
	.datum {
		font-style: italic;
	} */
</style>
