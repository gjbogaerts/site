<script lang="ts">
	import type { Berichten } from './../../index.ts';
	import { getDatum, getFirstParagraph } from '$lib/utils/strings.js';
	import slugify from 'typescript-slugify';
	import { Pagination } from '$components';
	let { data } = $props();
	// $inspect(props);
	const totalCount = data.count;
	const currentPage = 1;
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
	<Pagination {totalCount} {currentPage} />
	{#each berichten as bericht}
		<h2 class="mb-m">{bericht.title}</h2>
		<p class="mb-xs continue small-font">{getDatum(bericht)}</p>
		<p class="mb-xs">{@html getFirstParagraph(bericht.content)}</p>
		<p class="mb-l continue small-font">
			<a href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}>Lees verder</a>&nbsp;&hellip;
		</p>
	{/each}
	<Pagination {totalCount} {currentPage} />
</div>

<style>
	.continue {
		text-align: right;
	}
</style>
