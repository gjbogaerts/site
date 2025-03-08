<script lang="ts">
	import slugify from 'typescript-slugify';

	import { getDatum } from '$lib/utils/strings';
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
	<ul>
		{#each content as b}
			<li class="mb-s">
				<a class="link" href={`/bericht/${slugify(b.title)}/${b.id}`}>{b.title}</a>
				<span class="datum small-font">{getDatum(b)}</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	ul,
	li {
		list-style-type: disc;
		margin-left: 2em;
	}
	.datum {
		display: block;
		text-align: right;
	}
</style>
