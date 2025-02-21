<script lang="ts">
	import Logo from '$assets/logo.png';
</script>

<header class="header mt-m">
	<a href="/"> <img src={Logo} alt="Logo Raker" class="logo" /></a>
	<p>Het weblog van Geert-Jan Bogaerts</p>
	<nav class="nav">
		<ul>
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
	}
</style>
