<script lang="ts">
	let {
		user,
		content,
		title,
		publication_date = '',
		status,
		id,
		tags = '',
		mastodon_summary = '',
		sticky,
		taglist
	} = $props();
	// console.log(user, content, title, publication_date, status, id);
	let userId = user.id != null ? user.id : user;
	let postId = id != null ? id : null;
	let mastodonSummary = mastodon_summary !== '' ? mastodon_summary : '';
	let timeElapsed = Date.now();
	let today = new Date(timeElapsed);
	let dateValue = today.toISOString().slice(0, 10);
	if (publication_date === '') {
		publication_date = dateValue;
	}
	const fillTag = (tagName: string) => {
		// console.log(tagName);
		let tagArray = tags.split(',');
		tagArray.push(tagName);
		tags = tagArray.join(',');
	};
</script>

<form method="post" enctype="multipart/form-data">
	<input type="text" name="title" placeholder="Titel" class="wide" value={title} />
	<textarea name="content" placeholder="Je tekst" class="wide">{content}</textarea>
	<div class="form-div-container">
		<input
			type="date"
			name="publication_date"
			placeholder="Publicatiedatum"
			value={publication_date}
		/>
		<select name="status">
			<option value="concept">Status</option>
			<option value="publiceren" label="Publiceren" selected={status == 'publiceren' ? true : false}
				>Publiceren</option
			>
			<option value="concept" label="Concept" selected={status == 'concept' ? true : false}
				>Concept</option
			>
		</select>
	</div>
	<div class="form-div-container labeled">
		<label for="sticky">Sticky?</label><input type="checkbox" name="sticky" checked={sticky} />
	</div>
	<input
		type="text"
		name="tags"
		id="tags"
		placeholder="Een of meerdere, door een komma gescheiden, tags"
		class="wide"
		value={tags}
	/>
	<select multiple name="tag-list" class="taglist">
		{#each taglist as tagelement}
			<option value={tagelement.tag} onclick={() => fillTag(tagelement.tag)}
				>{tagelement.tag}</option
			>
		{/each}
	</select>
	<input type="file" name="image" />
	<textarea name="mastodon_summary" placeholder="Tekst voor Mastodon" class="wide"
		>{mastodonSummary}</textarea
	>
	<input type="hidden" name="user_id" value={userId} />
	<input type="hidden" name="id" value={postId} />
	<button>Opslaan</button>
</form>

<style>
	.wide {
		width: 100%;
	}
	textarea {
		height: 30rem;
	}
	.form-div-container {
		display: flex;
		gap: 5rem;
	}

	.form-div-container.labeled {
		gap: 1rem;
		align-items: center;
		justify-content: flex-start;
	}
	.form-div-container select,
	.form-div-container option {
		width: 30rem;
	}
	label {
		font-size: 1.8rem;
		width: auto;
	}
	input[type='checkbox'] {
		width: 2.5rem;
	}

	select,
	option {
		width: 100%;
	}

	.taglist {
		height: 20rem;
	}
	.taglist option {
		margin: 0;
		/* height: 1rem; */
	}
	/* .form-div-container input {
		flex: 1;
	} */
</style>
