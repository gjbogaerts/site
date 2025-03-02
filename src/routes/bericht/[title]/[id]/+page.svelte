<script lang="ts">
	import slugify from 'typescript-slugify';

	import { getDatum } from '$lib/utils/get_date';
	let { data } = $props();
	let { title, content, publication_date, date, id, image, tags } = $derived(data.data);
	interface tagObject {
		id: number;
		tag: string;
	}
	// $inspect(tags);

	const processTags = (): string | undefined => {
		// return 'todo';
		if (tags === null || tags.length === 0) return '';
		const tagLinks = tags.map((tagObject: tagObject) => {
			if (tagObject.tag === '') return;
			return `<a href="/tag/${slugify(tagObject.tag)}/${tagObject.id}">${tagObject.tag}</a>`;
		});
		return tagLinks?.join(', ');
	};

	// $inspect(data);
</script>

<article>
	<h1 class="mb-m">{title}</h1>
	<div class="meta-container">
		<div class="date tiny-font">
			{getDatum({ publication_date })}
		</div>
		<div class="tags small-font">
			<!-- {#each } -->
			{@html processTags()}
		</div>
	</div>
	<div class="content">
		{#if image !== null}
			<img class="feature" src={image} alt={`Illustratie bij ${title}`} />
		{/if}
		{@html content}
	</div>
</article>

<style>
	article {
		max-width: 70rem;
	}
	article :global {
		p {
			margin: 2rem 0;
			line-height: 1.5;
		}
		img {
			max-width: 100%;
		}
		.wp-block-separator {
			display: none;
		}
	}

	.content img {
		float: left;
		width: 40%;
		margin: 1rem 2rem;
	}
	.content img.feature {
		width: 100%;
		max-width: 100%;
		float: none;
	}

	.meta-container {
		display: flex;
		justify-content: space-between;
	}
</style>
