<script lang="ts">
	import Logo from '$assets/logo11.png';
	import { getUserState } from '$lib/state/user-state.svelte';
	let userContext = getUserState();
	let { user } = $derived(userContext);
</script>

<header class="header mt-m">
	<a href="/"> <img src={Logo} alt="Logo Raker" class="logo" /></a>
	<p class="credit">Geert-Jan Bogaerts</p>
	<nav class="nav">
		<ul>
			{#if user}
				<li><button onclick={() => userContext.logout()}>Uitloggen</button></li>
				<li><a href="/prive/dashboard">Dashboard</a></li>
			{/if}
			<li><a href="/archief">Archief</a></li>
			<li><a href="/over">Over mij</a></li>
		</ul>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		width: 200px;
	}
	.nav ul {
		display: flex;
		flex-direction: row;
		gap: 3rem;
	}

	.nav a {
		text-decoration: none;
		font-weight: bold;
		color: black;
	}
	@media screen and (max-width: 1100px) {
		p.credit {
			display: none;
		}
		header {
			position: relative;
			height: 13rem;
			margin-bottom: 5rem;
		}
		header::after {
			position: absolute;
			font-size: 2rem;
			content: 'Geert-Jan Bogaerts';
			top: 13rem;
			display: block;
			width: 100%;
			text-align: center;
		}
	}
	@media screen and (max-width: 600px) {
		.nav ul {
			flex-direction: column;
			gap: 1em;
		}
		header::after {
			top: 13rem;
		}
		header {
			margin-bottom: 5rem;
		}
	}
</style>
