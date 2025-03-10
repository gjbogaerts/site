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
<div class="header mb-l">
	<div class="waarom">
		<h3>Waarom dit blog?</h3>
		<p>
			In het najaar van 2024 ben ik begonnen met een journalistiek onderzoek naar wat ik voorlopig
			'de middenmotor' noem; de unieke samenwerking tussen publieke organisaties, burgerbewegingen
			en goedwillende marktpartijen om dringende maatschappelijke en culturele vraagstukken op te
			lossen. Dit blog is een reflectie van wat ik tijdens dat onderzoek tegenkom en helpt mij om
			mijn gedachten te ordenen. Daarnaast schrijf ik over mijn vakgebied: de digitale wereld en de
			manier waarop digitaal en fysiek elkaar beïnvloeden.
		</p>
	</div>
	<div class="search-container">
		<form method="get" action="/search">
			<input type="text" name="q" placeholder="Je zoekterm..." class="search-input" />
			<button class="search-btn">Zoeken</button>
		</form>
	</div>
</div>
<div class="grid mt-l">
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
	.header {
		display: flex;
		justify-content: space-between;
		border-radius: 8px;
		gap: 15rem;
		background-color: rgb(225, 215, 215);
		/* columns: 3fr 1fr; */
		margin: 1rem 0 3rem;
		padding: 2rem;
	}

	.waarom {
		flex: 4;
		/* max-width: 50rem; */
	}

	.search-container {
		flex: 1;
		/* display: flex;
		align-items: flex-start;
		justify-content: center; */
	}
	.search-input {
		border: 1px solid black;
		/* margin-left: 3rem; */
	}
	.search-btn {
		/* margin-right: 3rem; */
		padding: 1rem;
	}
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

	@media screen and (max-width: 1000px) {
		.header {
			flex-direction: column;
			gap: 3rem;
		}
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
