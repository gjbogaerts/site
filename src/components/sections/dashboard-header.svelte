<script lang="ts">
	import Add from '$assets/add.svg';
	import List from '$assets/menu-03.svg';
</script>

<ul>
	<li>
		<a href="/prive/berichten/nieuw"><img src={Add} alt="Nieuw bericht" /></a>
	</li>
	<li>
		<a href="/prive/dashboard"><img src={List} alt="Alle berichten" /></a>
	</li>
</ul>

<style>
	ul {
		display: flex;
		flex-direction: row;
		/* justify-content: space-around; */
		gap: 5rem;
	}
	img {
		width: 4rem;
	}
</style>
