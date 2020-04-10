function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// add number of abilities in external file and reference here

export const playerStats = {
  type: "PLAYER",
  targetable: false,
  maxHp: 40,
  hp: 40,
  maxMana: 10,
  mana: 10,
  actions: 5,
  actionStack: [],
  abilities: [
    {
      name: "heal",
      duration: 4,
      manaCost: 2,
      targetNumber: 3,
      targetType: "PLAYER",
      effect: target => {
        return target.update(u => ({ hp: (u.hp += getRandomInt(6, 7)), ...u }));
      }
    },
    {
      name: "attack",
      duration: 1,
      manaCost: 0,
      targetNumber: 2,
      targetType: "ENEMY",
      effect: target => {
        target.update(u => {
          return { hp: (u.hp -= 1), ...u };
        });
      }
    },
    {
      name: "defend",
      duration: 2,
      manaCost: 2,
      targetNumber: 5,
      targetType: "PLAYER",
      effect: target => {
        target.update(u => ({ hp: (u.hp -= getRandomInt(6, 7)), ...u }));
      }
    },
    {
      name: "hellfire",
      duration: 5,
      manaCost: 10,
      targetNumber: 3,
      targetType: "PLAYER",
      effect: target => {
        target.update(u => ({ hp: (u.hp -= getRandomInt(15, 44)), ...u }));
      }
    }
  ]
};

export const opponentStats = {
  type: "ENEMY",
  targetable: false,
  maxHp: 40,
  hp: 40,
  maxMana: 10,
  mana: 10,
  actions: 5,
  actionStack: [],
  abilities: [
    {
      name: "heal",
      duration: 4,
      manaCost: 2,
      targetNumber: 1,
      targetType: "PLAYER",
      effect: target => {
        target.update(u => ({ hp: (u.hp += getRandomInt(5, 9)), ...u }));
      }
    },
    {
      name: "attack",
      duration: 1,
      manaCost: 2,
      targetNumber: 1,
      targetType: "ENEMY",
      effect: target => {
        target.update(u => ({ hp: (u.hp -= getRandomInt(1, 7)), ...u }));
      }
    },
    {
      name: "defend",
      duration: 2,
      manaCost: 2,
      targetNumber: 1,
      targetType: "PLAYER",
      effect: target => {
        target.update(u => ({ hp: (u.hp -= getRandomInt(6, 7)), ...u }));
      }
    }
  ]
};
