<script lang="ts">
	import { Marked } from '@ts-stack/markdown';
	import { getDatum, processTags, truncateAtFirstBlankLine } from '$lib/utils/strings';
	import slugify from 'typescript-slugify';
	let { data } = $props();
	let { frontpageBerichten, error } = $derived(data);
	// $inspect(frontpageBerichten);
</script>

{#if error !== null}
	<h1 class="error">Oei, er is iets mis</h1>
	<p>Ik ga er zo snel mogelijk achteraan. Sorry!</p>
{/if}

<div class="grid">
	{#each frontpageBerichten as bericht, index}
		<div class={index === 0 ? 'grid-item item0' : 'grid-item'}>
			{#if bericht.image !== null}
				<div class="image-container">
					<img src={`${bericht.image}`} alt={bericht.title} class="feature-img" />
				</div>
			{/if}
			<div class="grid-text">
				{#if index === 0}
					<h1>{bericht.title}</h1>
				{:else}
					<h2>{bericht.title}</h2>
				{/if}
				<div class="meta mt-s mb-s">
					<p class="tiny-font">{getDatum(bericht)}</p>
					<p class="tiny-font">{@html processTags(bericht.tags)}</p>
				</div>
				<p>{@html Marked.parse(truncateAtFirstBlankLine(bericht.content))}</p>
				<p class="verder tiny-font">
					<a href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}>Lees verder</a>&nbsp;
					&hellip;
				</p>
			</div>
		</div>
	{/each}
</div>
<div class="archief mt-l"><p><a href="/archief">Oudere verhalen</a></p></div>

<style>
	.error {
		color: rgb(219, 33, 40);
	}
	.image-container {
		width: 100%;
		height: 25rem;
	}
	.feature-img {
		max-width: 100%;
		max-height: 25rem;
		object-fit: cover;
	}

	h1 {
		font-size: 3rem;
	}
	h2 {
		font-size: 2.4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 5rem;
		row-gap: 10rem;
		/* max-width: 800px; */
	}
	.grid-item {
		display: flex;
		flex-direction: column;
		justify-content: start;
		position: relative;
	}
	.verder {
		position: absolute;
		bottom: -3rem;
		right: 0;
	}
	.item0 {
		grid-column-start: 1;
		grid-column-end: 3;
		display: grid;
		grid-template-columns: 1fr 2fr;
	}
	.meta {
		display: flex;
		justify-content: space-between;
	}
	.archief {
		text-align: right;
	}

	@media screen and (max-width: 700px) {
		.grid {
			grid-template-columns: auto;
		}
		.item0 {
			grid-column-start: 1;
			grid-column-end: 1;
		}
	}
</style>
