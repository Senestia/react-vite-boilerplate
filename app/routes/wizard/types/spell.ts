export interface Spell {
  id: string
  name: string
  incantation?: string
  effect: string
  canBeVerbal?: boolean
  type: SpellType
  light: SpellLight
  creator?: string
}

export enum SpellType {
  Spell = "Spell",
  Charm = "Charm",
  Conjuration = "Conjuration",
  Curse = "Curse",
  HealingSpell = "HealingSpell",
  Hex = "Hex",
  Jinx = "Jinx",
  Transfiguration = "Transfiguration",
}

export enum SpellLight {
  None = "None",
  Blue = "Blue",
  IcyBlue = "IcyBlue",
  Red = "Red",
  Gold = "Gold",
  Purple = "Purple",
  Transparent = "Transparent",
  White = "White",
  Green = "Green",
  Orange = "Orange",
  Yellow = "Yellow",
  BrightBlue = "BrightBlue",
  Pink = "Pink",
  Violet = "Violet",
  BlueishWhite = "BlueishWhite",
  Silver = "Silver",
  Scarlet = "Scarlet",
  Fire = "Fire",
  FieryScarlet = "FieryScarlet",
  Grey = "Grey",
  DarkRed = "DarkRed",
  Turquoise = "Turquoise",
  PsychedelicTransparentWave = "PsychedelicTransparentWave",
  BrightYellow = "BrightYellow",
  BlackSmoke = "BlackSmoke",
}

export interface SpellSearchQueryArgs {
  query: string
}
