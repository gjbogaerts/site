<script lang="ts">
	import { convertDatetime } from '$lib/utils/strings';
	let { comments, bericht } = $props();
</script>

<h4 class="comment-invite">
	Reageren op dit bericht? Dat kan op mijn <a
		target="_blank"
		href={`https://social.publicspaces.net/@geertjan/${bericht.mastodon_post_id}`}
		>Mastodon-account</a
	>
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

<style>
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
