<script lang="ts">
	import { Marked } from '@ts-stack/markdown';

	import { getFirstParagraph, getTagString, getDatum, processTags } from '$lib/utils/strings';

	const { bericht } = $props();
	// let bericht = $state({ title: '', content: '', tags: '', publication_date: '', image: '' });
	// const props = $props();
	// bericht = $derived(props.bericht);
	// $inspect(bericht);
	// const data = $state(bericht);
	// $effect(()=>{
	// 	 berichtContent=Marked.parse(data.content);
	// })
	// const berichtContent = Marked.parse(data.content);
</script>

<svelte:head>
	<title>Raker | {bericht!.title}</title>
	<meta name="description" content={`${getFirstParagraph(bericht.content)}`} />
	<meta name="keywords" content={getTagString(bericht.tags)} />
</svelte:head>
<article>
	<h1 class="mb-l">{bericht!.title}</h1>
	<div class="meta-container">
		<div class="date tiny-font">
			{getDatum(bericht!)}
		</div>
		<div class="tags small-font">
			<!-- {#each } -->
			{@html processTags(bericht.tags)}
		</div>
	</div>
	<div class="content">
		{#if bericht!.image !== null}
			<img class="feature" src={bericht!.image} alt={`Illustratie bij ${bericht!.title}`} />
		{/if}
		{@html Marked.parse(bericht.content)}
	</div>
</article>

<style>
	article :global {
		p {
			margin: 2rem 0;
		}
		li {
			margin-left: 2rem;
		}
		ol li {
			list-style-type: decimal;
		}
		ul li {
			list-style-type: disc;
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

	.content img.feature {
		margin: 0;
	}
	.meta-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
