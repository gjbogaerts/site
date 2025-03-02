<script lang="ts">
	import slugify from 'typescript-slugify';

	import { getDatum } from '$lib/utils/get_date';
	const { response } = $props();

	function sluggify(title: string) {
		return slugify(title);
	}
</script>

<aside class="other-stuff">
	<div class="zoeken">
		<form method="get" action="/search">
			<input type="search" name="q" placeholder="Wat zoek je?" />
			<button class="zoeken mt-s">Zoeken</button>
		</form>
	</div>

	<div class="underscore"></div>
	<div class="sticky">
		<h3>Laatste tien</h3>
		<ul>
			{#each response.data as bericht}
				<li>
					<span class="datum tiny-font">{getDatum(bericht)}</span><a
						href={`/bericht/${sluggify(bericht.title)}/${bericht.id}`}>{bericht.title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</aside>

<style>
	.other-stuff {
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}
	.sticky li {
		margin: 2rem 0;
	}
	.sticky li span {
		display: block;
	}
	.zoeken {
		display: block;
		/* padding: 1rem; */
	}
</style>
