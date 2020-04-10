import { writable } from "svelte/store";

export function battleStore(state) {
  const { subscribe, update, set } = writable(state);

  function select(e) {
    // enter selection mode
    update(state => {
      const targetableNodes = state.nodes.map(node => {
        if (node.type === e.detail.targetType) {
          return { ...node, targetable: true };
        } else return node;
      });

      return {
        targetMode: true,
        nodes: targetableNodes,
        ...state
      };
    });

    console.log(state);

    // nodes in range with matching targetType of ability can be selected
    // highlight matchingNodes and make them selectable
    // get number of targets
    // const nTargets = [...Array(e.detail.targetNumber).keys()];
    // select 1 .. nTargets
    let selection = [];
    // return selected nodes
    return selection;
    /*
    const nTargets = [...Array(e.detail.targetNumber).keys()];
    let selection = [];
    return selection;
    */
  }

  return { subscribe, update, set, select };
}

export function nodeStore(node) {
  const { subscribe, update, set } = writable(node);

  function performAction(effect, target) {
    effect(target);
  }

  function addToActionStack(action, target, remainingMana) {
    update(node => {
      const actionStackSum = node.actionStack.reduce((acc, curr) => {
        return acc + curr.duration;
      }, action.duration);

      if (actionStackSum <= node.actions) {
        return {
          ...node,
          mana: remainingMana,
          actionStack: [...node.actionStack, { ...action, target }]
        };
      } else {
        return node;
      }
    });
  }

  function submitActions(actionStack) {
    console.log(actionStack);
    actionStack.map(a => performAction(a.effect, a.target));
    update(node => ({ ...node, actionStack: [] }));
  }

  return {
    subscribe,
    update,
    set,
    addToActionStack,
    performAction,
    submitActions
  };
}
