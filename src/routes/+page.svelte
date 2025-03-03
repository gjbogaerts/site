<script lang="ts">
	import { Article } from '$components';

	let { data } = $props();
	let bericht = $state(data.bericht);

	let tags = bericht!.tags;
</script>

<Article {bericht} />
