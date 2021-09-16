export function validateMountain(element: string): boolean {
  const REGEX_MOUNTAIN_VALIDATION = /^[Mm]\s-\s[0-9]\s-\s[0-9]$/gm

  return REGEX_MOUNTAIN_VALIDATION.test(element)
}

export function validateTreasure(element: string): boolean {
  const REGEX_TREASURE_VALIDATION = /^[Tt]\s-\s[0-9]\s-\s[0-9]\s-\s[1-9]$/gm

  return REGEX_TREASURE_VALIDATION.test(element)
}

export function validateAdventurer(element: string): boolean {
  const REGEX_ADVENTURER_VALIDATION =
    /^[Aa]\s-\s[a-zA-Z]{1,10}\s-\s[0-9]\s-\s[0-9]\s-\s[Nn|Ss|Oo|Ee]\s-\s[Aa|Dd|Gg]{1,20}$/gm

  return REGEX_ADVENTURER_VALIDATION.test(element)
}
