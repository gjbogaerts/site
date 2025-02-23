<script lang="ts">
	let { data } = $props();
	let { title, content, publication_date, date, id } = data;

	const getDate = () => {
		if (publication_date != null) {
			return publication_date;
		}
		return date;
	};

	// $inspect(data);
</script>

<article>
	<h1 class="mb-m">{title}</h1>
	<div class="meta mb-s">
		<p>Gepubliceerd op {getDate()}</p>
	</div>
	{@html content}
</article>

<style>
	article {
		max-width: 70rem;
	}
	article :global {
		p {
			margin: 2rem 0;
			line-height: 1.5;
		}
		img {
			max-width: 100%;
		}
		.wp-block-separator {
			display: none;
		}
	}
	.meta p {
		font-size: 1.6rem;
	}
</style>
