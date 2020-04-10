<script>
  import { nodeStore } from "../store/stores.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let node;
  export let state = nodeStore(node);

  function selectTargets(ability) {
    const remainingMana = $state.mana - ability.manaCost;

    if (remainingMana >= 0) {
      let tt = dispatch("action", ability);
      // replace with actual target
      let target = state;
      state.addToActionStack(ability, target, remainingMana);
    }
  }
</script>

<style>
	.bar {
	  height: 10px;
	  width: 200px;
	  transform-origin: left center;
	}
	ul {
	  padding: 0;
	}
	li {
	  list-style-type: none;
	}
	.action {
	  height: 100%;
	  width: 100%;
	  background-color: rgba(0, 0, 0, 0.1);
	}
	.actions {
	  width: 100%;
	  display: grid;
	  grid-template-columns: repeat(auto-fill, 20px);
	  grid-template-rows: 20px;
	  justify-items: start;
	  gap: 2px;
	}
	.node {
	  background-color: rgba(0, 0, 0, 0.1);
	}
</style>

<div class:node={$state.targetable}>
	{$state.hp} / {$state.maxHp}
	<div class="actions">
		{#each [...Array($state.actions).keys()] as action}
			<div class="action"></div>
		{/each}
	</div>
	<div class="actions">
		{#each $state.actionStack as action}
			<div class="action" style="background-color: green; grid-column: span {action.duration}"></div>
		{/each}
	</div>
	<div class="bar" style="transform: scaleX({$state.hp / $state.maxHp}); background-color: red;"></div>
	<div class="bar" style="transform: scaleX({$state.mana / $state.maxMana}); background-color: blue;"></div>
	<ul>
		{#each $state.abilities as ability}
			<li>
		<button on:click={() => {
			selectTargets(ability)
		}}>{ability.name}{ability.duration}</button></li>
		{/each}
	</ul>
	<button on:click={() => state.submitActions($state.actionStack)}>
		Submit
	</button>
</div>