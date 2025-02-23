<script lang="ts">
	let { data } = $props();

	function getFirstParagraph(htmlString: string): string {
		const firstParagraphStart = htmlString.indexOf('<p>');
		const firstParagraphEnd = htmlString.indexOf('</p>');
		const firstParagraph = htmlString.slice(firstParagraphStart, firstParagraphEnd);
		return firstParagraph;
	}
</script>

{#each data.berichten as bericht, index}
	{#if index == 0}
		<h1 class="mb-l">{bericht.title}</h1>
	{:else}
		<h2 class="mt-l mb-s">{bericht.title}</h2>
	{/if}
	{@html getFirstParagraph(bericht.content)}
{/each}
