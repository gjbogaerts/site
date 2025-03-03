<script lang="ts">
	import { Article } from '$components';
	let { data } = $props();
	let bericht = $derived(data.data);
</script>

<Article {bericht} />
