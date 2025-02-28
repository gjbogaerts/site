<script lang="ts">
	let { totalCount, currentPage } = $props();
	let numPages = Math.floor(totalCount / 10);
	// $inspect(numPages);
	// $inspect(totalCount);
	// let pageArray = Array.from({ length: numPages }, (e, i) => i + 1);
	let startArray = $state([1, 2, 3]);
	let endArray = $state([numPages - 3, numPages - 2, numPages - 1]);
	let currentArray = $state([currentPage - 1, currentPage, currentPage + 1]);

	if (currentPage === 1) {
		currentArray = [currentPage, currentPage + 1, currentPage + 2];
	}

	function calc() {
		// let newArray = startArray.concat(currentArray);
		let s = new Set([...startArray, ...currentArray]);
		let newArray = [...s];
		if (newArray.length < 6) {
			startArray = newArray;
			currentArray = [];
		}
		let a = new Set([...endArray, ...currentArray]);
		let finalArray = [...a];
		if (finalArray.length < 6) {
			endArray = finalArray;
			currentArray = [];
		}
		// }
		// console.log(newArray);
		// console.log(finalArray);
		// console.log(currentArray);
	}
	calc();
</script>

<div class="pagination mb-m mt-m">
	<ul>
		{#if currentPage !== 1}
			<li><a href="/archief">&laquo;</a></li>
			<li><a href={`/archief/${currentPage - 1}`}>&lsaquo;</a></li>
		{/if}

		{#each startArray as index}
			{#if currentPage === index}
				<li>{index}</li>
			{:else}
				<li><a href={`/archief/${index}`}>{index}</a></li>
			{/if}
		{/each}
		<li>&hellip;</li>

		{#each currentArray as index}
			{#if currentPage === index}
				<li>{index}</li>
			{:else if index === 0}
				<li class="none">&nbsp;</li>
			{:else}
				<li><a href={`/archief/${index}`}>{index}</a></li>
			{/if}
		{/each}

		{#if currentArray.length > 0}
			<li>&hellip;</li>
		{/if}

		{#each endArray as index}
			{#if currentPage === index}
				<li>{index}</li>
			{:else}
				<li><a href={`/archief/${index}`}>{index}</a></li>
			{/if}
		{/each}

		{#if currentPage < numPages - 1}
			<li><a href={`/archief/${currentPage + 1}`}>&rsaquo;</a></li>
			<li><a href={`/archief/${numPages}`}>&raquo;</a></li>
		{/if}
	</ul>
</div>

<style>
	.pagination {
		padding: 1.5rem;
		border: 1px solid rgb(200, 200, 200);
	}
	.pagination ul {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 2rem;
	}
	.none {
		display: none;
	}
</style>
