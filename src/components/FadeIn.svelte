<script>
	import { inview } from 'svelte-inview';
	import { Motion, useAnimation } from 'svelte-motion';

	export let duration = 1;
	export let delay = 0.25;

	let fadeControls = useAnimation();

	let viewEnter = () => {
		fadeControls.start('visible');
	};

	let viewLeave = () => {
		fadeControls.start('hidden');
	};
</script>

<div use:inview on:inview_enter={viewEnter} on:inview_leave={viewLeave}>
	<Motion
		let:motion
		variants={{
			hidden: { opacity: 0 },
			visible: { opacity: 1 }
		}}
		initial="hidden"
		animate={fadeControls}
		transition={{ duration, delay }}
	>
		<div use:motion>
			<slot />
		</div>
	</Motion>
</div>
