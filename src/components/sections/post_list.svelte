<script lang="ts">
	import slugify from 'typescript-slugify';
	import { getDatum } from '$lib/utils/strings.js';
	const { berichten } = $props();
</script>

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

<style>
	.bericht {
		display: flex;
		gap: 5rem;
		justify-content: space-between;
		align-items: baseline;
		margin: 1rem 0;
	}
</style>
