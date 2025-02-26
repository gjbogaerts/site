<script lang="ts">
	import slugify from 'typescript-slugify';
	const { response } = $props();

	function sluggify(title: string) {
		return slugify(title);
	}

	function getDatum(bericht: any): string {
		if (bericht.publication_date != null) {
			return bericht.publication_date;
		}
		return bericht.date;
	}
</script>

<aside class="other-stuff">
	<div class="zoeken">
		<input type="search" placeholder="Zoeken" />
	</div>

	<div class="underscore"></div>
	<div class="sticky">
		<h3>Laatste tien</h3>
		<ul>
			{#each response.data as bericht, index}
				{#if index > 0}
					<li>
						<span class="datum tiny-font">{getDatum(bericht)}</span><a
							href={`/bericht/${sluggify(bericht.title)}/${bericht.id}`}>{bericht.title}</a
						>
					</li>
				{/if}
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
</style>
