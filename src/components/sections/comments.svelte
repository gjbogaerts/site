<script lang="ts">
	import { convertDatetime } from '$lib/utils/strings';
	import MastodonLogo from '$assets/wordmark-black-text.svg';
	let { comments, bericht } = $props();
</script>

<h4 class="comment-invite">
	Reageren op dit bericht? Dat kan op mijn <a
		target="_blank"
		href={`https://social.publicspaces.net/@geertjan/${bericht.mastodon_post_id}`}
		><img src={MastodonLogo} alt="Mastodon logo" class="mastodon-logo" /> account</a
	><span class="footnote"><a href="#footnote">*</a></span>
</h4>

{#if comments.length > 0}
	<section class="comments mt-l">
		<h2 class="mb-s">Reacties</h2>
		<ul>
			{#each comments as comment}
				<li class="mb-s">
					<p class="comment-author small-font">
						<a href={`${comment.account.url}`}>{comment.account.username}</a> schreef op {convertDatetime(
							comment.created_at
						)}
					</p>
					<div class="comment-text">{@html comment.content}</div>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<p class="footnote-text tiny-font mt-l" id="footnote">
	<span class="footnote">*</span>Commentaren die je op Mastodon plaatst, worden niet lokaal
	opgeslagen; als je daar je commentaar aanpast of verwijdert, gebeurt dat ook in deze site nadat je
	deze pagina hebt ververst.
</p>

<style>
	.mastodon-logo {
		width: 100px;
		transform: translateY(0.7rem);
	}

	.footnote {
		display: inline-block;
		margin: 0 1rem;
		transform: translateY(-5px);
		color: red;
	}
	.footnote a {
		text-decoration: none;
	}

	.comment-invite {
		font-weight: 700;
		font-size: 2.2rem;
	}
	.comment-author {
		font-style: italic;
	}
	.comment-text {
		margin-left: 2rem;
	}
</style>
