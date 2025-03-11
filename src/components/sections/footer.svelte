<footer class="mt-l mb-l footer">
	<div class="motto">
		<h3>Wat mij drijft</h3>
		<p>
			Maatschappelijke progressie is de vrucht van een gelukkig huwelijk tussen kunst en wetenschap,
			design en technologie, politiek en activisme, filosofie en ethiek.
		</p>
	</div>
	<div class="varia">
		<p class="tiny-font">
			Alle stukken die ik geschreven heb en de tekeningen die ik heb gemaakt, mogen worden gedeeld
			conform een CC_BY_SA licentie. Dit betekent dat je er alles mee mag doen, op voorwaarde dat je
			een linkje plaatst naar deze site en benoemt waar je het materiaal vandaan hebt, en
			herdistributie onder gelijke voorwaarden mogelijk maakt.
		</p>
		<p class="tiny-font mt-s mb-s">
			<a href="https://github.com/gjbogaerts/site">Broncode van deze site.</a>
		</p>
	</div>
	<div class="socials mt-m">
		<a href="https://social.publicspaces.net/@geertjan" aria-label="Volg me op Mastodon"
			><img src="/logo-purple.svg" alt="Volg me op Mastodon" width="40" /></a
		>
		<a href="https://linkedin.com/in/gjbogaerts" aria-label="Mijn profiel op LinkedIn">
			<img src="/LI-Logo.png" alt="Mijn profiel op LinkedIn" width="80" />
		</a>
		<a href="/rss.xml"><img src="/rss.png" width="40" alt="RSS-Feed" /></a>
	</div>
	<div class="cc-img">
		<img src="/by-sa.svg" alt="CC-BY-SA licentie logo" />
	</div>
</footer>

<style>
	.footer {
		padding: 2rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 15rem;
		row-gap: 3rem;
		align-items: flex-start;
	}
	/* .motto {
		flex: 2;
	}
	.varia {
		flex: 1;
	} */
	.socials {
		display: flex;
		align-items: center;
		gap: 3rem;
	}
	.cc-img {
		align-self: center;
	}
	@media screen and (max-width: 800px) {
		.footer {
			gap: 3rem;
			flex-direction: column;
		}
	}
	@media screen and (max-width: 450px) {
		.footer {
			display: flex;
		}
		.cc-img {
			align-self: flex-start;
			margin-bottom: 10rem;
		}
	}
</style>
