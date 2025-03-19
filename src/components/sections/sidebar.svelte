<script lang="ts">
	import slugify from 'typescript-slugify';

	import { getDatum } from '$lib/utils/strings';
	const { response, stickies } = $props();
	// $inspect(response);
</script>

<aside class="other-stuff">
	<div class="zoeken">
		<form method="get" action="/search">
			<input type="search" name="q" placeholder="Je zoekterm..." />
			<button class="zoeken">Zoeken</button>
		</form>
	</div>

	{#if stickies && stickies.length > 0}
		<div class="sticky">
			<h3>Perma</h3>
			<ul>
				{#each stickies as sticky}
					<li>
						<span class="datum tiny-font">{getDatum(sticky)}</span><a
							href={`/bericht/${slugify(sticky.title)}/${sticky.id}`}>{sticky.title}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="sticky">
		<h3>Laatste tien</h3>
		<ul>
			{#each response as bericht}
				<li>
					<span class="datum tiny-font">{getDatum(bericht)}</span><a
						href={`/bericht/${slugify(bericht.title)}/${bericht.id}`}>{bericht.title}</a
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
		gap: 4rem;
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
