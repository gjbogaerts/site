<script lang="ts">
	import type { Berichten } from '../../../index';
	import { getDatum } from '$lib/utils/strings.js';
	import slugify from 'typescript-slugify';
	// import { Pagination } from '$components';
	let { data } = $props();
	// // $inspect(props);
	const totalCount = data.count;
	// const currentPage = 1;
	let berichten: Berichten[] = data.data as unknown as Berichten[];
	// // $inspect(aantal);
</script>

<svelte:head>
	<title>Archief | Raker</title>
	<meta
		name="description"
		content="Het complete archief van Raker. Een weblog van Geert-Jan Bogaerts, met een serie posts die zijn gechreven tussen 2005 en 2015, met een hervatting in 2025"
	/>
</svelte:head>

<div class="archief">
	<h1>Oude verhalen</h1>
	<p>
		Dit is het complete archief van Raker. Een serie posts ({totalCount} inmiddels) die zijn geschreven
		tussen 2005 en 2015, met een hervatting in 2025. De oude verhalen zijn inmiddels een aantal keer
		gekopieerd naar nieuwe CMS'en, en ik ben er niet zeker van dat ze op de correcte manier worden weergegeven.
		Ik ontsluit ze toch via deze pagina omdat het wellicht de moeite waard is om nog eens te bekijken
		hoe vaak ik van mening ben veranderd.
	</p>
	<!-- <Pagination {totalCount} {currentPage} /> -->
	<ul class="mt-l">
		{#each berichten as bericht}
			<li class="bericht">
				<p class="bericht-title">
					<a href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}>{bericht.title}</a>
				</p>
				<p class="tiny-font">{getDatum(bericht)}</p>
			</li>
		{/each}
	</ul>
	<!-- <Pagination {totalCount} {currentPage} /> -->
</div>

<style>
	.bericht {
		display: flex;
		gap: 5rem;
		justify-content: space-between;
		align-items: baseline;
		margin: 1rem 0;
	}
	.bericht a {
		color: rgb(33, 33, 33);
	}
</style>
