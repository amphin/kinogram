export const CellState = Object.freeze({
  EMPTY: "EMPTY",
  FILLED: "FILLED",
  CROSSED: "CROSSED"
});

export const CellStateBool = Object.freeze({
  [CellState.EMPTY]: false,
  [CellState.FILLED]: true,
  [CellState.CROSSED]: false
});

export function mapIntToCellState(int) {
  if (int === 1) { return CellState.FILLED; }
  if (int === -1) { return CellState.CROSSED; }
  if (int === 0) { return CellState.EMPTY; } 
  return CellState.EMPTY;
}