<script>
	// BATTLE PROCEDURE

	// 1. players turn
	// 2. player can choose an arbitrary number of actions until his action stack is full
	// 3. player submits 2 actions: attack, attack
	// 4. opponents turn
	// 5. opponent can choose actions:
	// 		maximum = action stack
	// 		minimum = number of players actions
	// 		if the players used all his actions the opponent must do the same
	// 6. if more than 1 fighter is still alive a new round begins
	// 7. if another fither appears he will choose his actions in that turn last
	import { battleStore, nodeStore } from "../store/stores.js";
	import { playerStats, opponentStats } from "../store/stats.js";

	import Node from "../components/Node.svelte";

	export const battle = battleStore({
	  targetMode: false,
	  turnNumber: 1,
	  turn: 1,
	  nodes: [playerStats, opponentStats, opponentStats]
	});
	setTimeout(() => {
	  $battle.nodes = [...$battle.nodes, opponentStats];
	}, 3000);
</script>

{#each $battle.nodes as state}
	<Node on:action={battle.select} node={state}></Node>
{/each}
<button on:click={() => $battle.nodes = [...$battle.nodes, playerStats]}>
	Add Player
</button>