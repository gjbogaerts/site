<script lang="ts">
	import { stripHtml } from 'string-strip-html';
	let { data } = $props();

	// $inspect(data.berichten);

	function parseDom(s: string): string {
		let summary = s.slice(0, 900);
		return stripHtml(summary).result;
	}
</script>

{#each data.berichten as bericht, index}
	{#if index == 0}
		<h1 class="mb-l">{bericht.title}</h1>
	{:else}
		<h2 class="mt-l mb-s">{bericht.title}</h2>
	{/if}
	<p>{parseDom(bericht.content)}</p>
{/each}
