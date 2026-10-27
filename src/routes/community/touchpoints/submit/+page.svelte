<script lang="ts">
	import CtaButton from '$lib/components/ui/primitives/CtaButton.svelte';
	import { SHOW_AND_TELL_DISCUSSION_URL } from '$lib/community';

	const FORM_NAME = 'touchpoint-session';
	const CODE_OF_CONDUCT_URL =
		'https://github.com/DevRel-Foundation/governance/blob/main/code_of_conduct.md';

	const formats = [
		{ value: 'Show and tell', label: 'Show and tell: demo a workflow' },
		{ value: 'Lightning talk', label: 'Lightning talk: share what you learned' },
		{ value: 'Discussion starter', label: 'Discussion starter: bring a question or problem' }
	];

	const durations = ['5 to 10 minutes', '15 minutes', '20 to 30 minutes'];

	const timings = [
		'Any upcoming Touchpoint',
		'Within the next two months',
		'Later, I will confirm a date'
	];

	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		status = 'submitting';

		const body = new URLSearchParams();
		for (const [key, value] of new FormData(form)) {
			if (typeof value === 'string') body.append(key, value);
		}

		try {
			const response = await fetch('/__forms.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: body.toString()
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			form.reset();
			status = 'success';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.error('Session submission failed', error);
			status = 'error';
		}
	}
</script>

<svelte:head>
	<title>Submit a session | Community Touchpoints | Developer Relations Foundation</title>
	<meta
		name="description"
		content="Propose a show-and-tell session, lightning talk, or discussion for an upcoming DRF Community Touchpoint."
	/>
</svelte:head>

<div class="container submit">
	<a class="submit__back" href="/community/touchpoints">← Community Touchpoints</a>
	<h1>Submit a session</h1>
	<p class="submit__lead">
		Propose a short session for an upcoming Community Touchpoint. We are especially looking for
		show-and-tell sessions about automated and agent-assisted workflows for DevRel work, but any
		topic that helps DevRel practitioners is welcome.
	</p>

	{#if status === 'success'}
		<section class="submit__result submit__result--success" role="status">
			<h2>Thank you for your submission!</h2>
			<p>
				Community organizers will review your proposal and contact you by email to find a date. In
				the meantime, you can join the conversation on <a
					href={SHOW_AND_TELL_DISCUSSION_URL}
					target="_blank"
					rel="noopener noreferrer">GitHub Discussions ↗</a
				>
				or check the <a href="/calendar">community calendar</a>.
			</p>
			<button type="button" class="submit__again" onclick={() => (status = 'idle')}
				>Submit another session</button
			>
		</section>
	{:else}
		<form
			class="submit__form"
			name={FORM_NAME}
			method="POST"
			action="/__forms.html"
			onsubmit={handleSubmit}
		>
			<input type="hidden" name="form-name" value={FORM_NAME} />
			<p class="submit__honeypot" aria-hidden="true">
				<label
					>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off" /></label
				>
			</p>

			<fieldset>
				<legend>About you</legend>
				<div class="submit__row">
					<label class="submit__field">
						<span>Name <abbr title="required">*</abbr></span>
						<input name="name" type="text" autocomplete="name" required maxlength="120" />
					</label>
					<label class="submit__field">
						<span>Email <abbr title="required">*</abbr></span>
						<input name="email" type="email" autocomplete="email" required maxlength="200" />
						<small>We only use your email to coordinate your session.</small>
					</label>
				</div>
				<div class="submit__row">
					<label class="submit__field">
						<span>GitHub or Discord username</span>
						<input name="handle" type="text" maxlength="100" />
					</label>
					<label class="submit__field">
						<span>Company, project, or community</span>
						<input name="affiliation" type="text" maxlength="150" />
					</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Your session</legend>
				<label class="submit__field">
					<span>Session title <abbr title="required">*</abbr></span>
					<input name="title" type="text" required maxlength="150" />
				</label>
				<div class="submit__row">
					<label class="submit__field">
						<span>Format <abbr title="required">*</abbr></span>
						<select name="format" required>
							{#each formats as format (format.value)}
								<option value={format.value}>{format.label}</option>
							{/each}
						</select>
					</label>
					<label class="submit__field">
						<span>Length <abbr title="required">*</abbr></span>
						<select name="duration" required>
							{#each durations as duration (duration)}
								<option value={duration}>{duration}</option>
							{/each}
						</select>
					</label>
				</div>
				<label class="submit__field">
					<span>What will you share? <abbr title="required">*</abbr></span>
					<textarea name="summary" rows="5" required maxlength="2000"></textarea>
					<small>The problem, how your workflow solves it, and what the community will learn.</small
					>
				</label>
				<label class="submit__field">
					<span>Tools, platforms, and reusable skills involved</span>
					<textarea name="tools" rows="3" maxlength="1000"></textarea>
					<small>Tell us what runs automatically and where a person reviews the work.</small>
				</label>
				<div class="submit__row">
					<label class="submit__field">
						<span>When would you like to present?</span>
						<select name="timing">
							{#each timings as timing (timing)}
								<option value={timing}>{timing}</option>
							{/each}
						</select>
					</label>
					<label class="submit__field">
						<span>Link to slides, a repository, or a past recording</span>
						<input name="link" type="url" placeholder="https://" maxlength="500" />
					</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Agreements</legend>
				<label class="submit__check">
					<input name="recording" type="checkbox" value="yes" />
					<span>The Touchpoint can be recorded and the recording can be shared publicly.</span>
				</label>
				<label class="submit__check">
					<input name="code-of-conduct" type="checkbox" value="yes" required />
					<span>
						I agree to follow the
						<a href={CODE_OF_CONDUCT_URL} target="_blank" rel="noopener noreferrer"
							>DevRel Foundation Code of Conduct ↗</a
						>. <abbr title="required">*</abbr>
					</span>
				</label>
			</fieldset>

			<p class="submit__privacy">
				Community organizers and Linux Foundation staff review submissions. See our
				<a href="/privacy">privacy policy</a> for how we handle your information.
			</p>

			{#if status === 'error'}
				<p class="submit__result submit__result--error" role="alert">
					We couldn't send your submission. Please try again, or share your idea in
					<a href={SHOW_AND_TELL_DISCUSSION_URL} target="_blank" rel="noopener noreferrer"
						>GitHub Discussions ↗</a
					>.
				</p>
			{/if}

			<CtaButton type="submit" disabled={status === 'submitting'} class="submit__button">
				{status === 'submitting' ? 'Sending…' : 'Submit session'}
			</CtaButton>
		</form>
	{/if}
</div>

<style>
	.submit {
		max-width: 52rem;
		margin-block: var(--space-m) var(--space-2xl);
	}

	.submit__back {
		font-size: var(--step--1);
		font-weight: 600;
		color: var(--color-link);
	}

	.submit h1 {
		margin: var(--space-s) 0;
		font-size: var(--step-5);
		color: var(--color-text);
	}

	.submit__lead {
		font-size: var(--step-0);
	}

	.submit__form {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		margin-top: var(--space-m);
	}

	.submit__form fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		margin: 0;
		padding: var(--space-m);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-m);
		background: var(--color-background);
	}

	.submit__form legend {
		padding: 0 var(--space-2xs);
		font-size: var(--step-1);
		font-weight: 700;
		color: var(--color-text);
	}

	.submit__row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--space-s);
	}

	.submit__field {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);
		font-size: var(--step--1);
		font-weight: 600;
		color: var(--color-text);
	}

	.submit__field input,
	.submit__field select,
	.submit__field textarea {
		width: 100%;
		padding: var(--space-xs) var(--space-s);
		border: 1px solid var(--color-background-secondary-2);
		border-radius: var(--radius-s);
		background: var(--color-background);
		color: var(--color-text);
		font: inherit;
		font-weight: 400;
		box-sizing: border-box;
	}

	.submit__field textarea {
		resize: vertical;
	}

	.submit__field input:focus-visible,
	.submit__field select:focus-visible,
	.submit__field textarea:focus-visible,
	.submit__check input:focus-visible {
		outline: var(--focus-ring-width) solid var(--color-link);
		outline-offset: var(--focus-ring-offset);
	}

	.submit__field small {
		font-weight: 400;
		opacity: 0.8;
	}

	.submit abbr {
		text-decoration: none;
		color: var(--color-error-text);
	}

	.submit__check {
		display: flex;
		align-items: flex-start;
		gap: var(--space-xs);
		font-size: var(--step--1);
		color: var(--color-text);
	}

	.submit__check input {
		margin-top: 0.3em;
		accent-color: var(--color-link);
	}

	.submit__honeypot {
		position: absolute;
		left: -9999px;
	}

	.submit__privacy {
		margin: 0;
		font-size: var(--step--1);
	}

	.submit :global(.submit__button) {
		align-self: flex-start;
	}

	.submit__result {
		padding: var(--space-s) var(--space-m);
		border-radius: var(--radius-s);
	}

	.submit__result h2 {
		margin: 0 0 var(--space-xs);
		font-size: var(--step-2);
		color: inherit;
	}

	.submit__result p {
		color: inherit;
	}

	.submit__result--success {
		margin-top: var(--space-m);
		border: 1px solid var(--color-success-border);
		background: var(--color-success);
		color: var(--color-success-text);
	}

	.submit__result--error {
		margin: 0;
		border: 1px solid var(--color-error-border);
		background: var(--color-error);
		color: var(--color-error-text);
	}

	.submit__result a {
		color: inherit;
		font-weight: 600;
	}

	.submit__again {
		padding: var(--space-xs) var(--space-m);
		border: 1px solid currentColor;
		border-radius: var(--radius-pill);
		background: transparent;
		color: inherit;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
</style>
