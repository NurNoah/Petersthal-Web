const DEEPEST_DRAWDOWN_ELEVATION = 818;
const OPERATING_DRAWDOWN_ELEVATION = 840;
const NORMAL_TARGET_ELEVATION = 850;
const FLOOD_TARGET_ELEVATION = 851;

export const NORMAL_STORAGE_MILLION_CUBIC_METRES = 25.4;
export const MAX_STORAGE_MILLION_CUBIC_METRES = 28.45;

const OPERATING_STORAGE_MILLION_CUBIC_METRES = 20;
const STORAGE_AT_OPERATING_DRAWDOWN =
  NORMAL_STORAGE_MILLION_CUBIC_METRES - OPERATING_STORAGE_MILLION_CUBIC_METRES;

/**
 * Estimates the reservoir content from the measured water elevation.
 *
 * The official figures published by the Bavarian LfU provide these anchors:
 * - 840 m: operating drawdown target
 * - 850 m: 25.4 million m³ at the normal target
 * - 20 million m³ of operating storage between 840 m and 850 m
 * - 2.9 km² surface area at the normal target
 * - 851 m: flood target, with 28.45 million m³ maximum storage
 *
 * Between 840 m and 850 m a quadratic curve matches both published storage
 * volumes and the published surface area at 850 m (dV/dh = area). Outside
 * that operating range the values are only needed as safe extrapolations.
 */
export function estimateStorageVolume(elevationMetres: number) {
  if (!Number.isFinite(elevationMetres) || elevationMetres <= DEEPEST_DRAWDOWN_ELEVATION) {
    return 0;
  }

  if (elevationMetres < OPERATING_DRAWDOWN_ELEVATION) {
    const relativeHeight =
      (elevationMetres - DEEPEST_DRAWDOWN_ELEVATION) /
      (OPERATING_DRAWDOWN_ELEVATION - DEEPEST_DRAWDOWN_ELEVATION);
    return STORAGE_AT_OPERATING_DRAWDOWN * relativeHeight ** 2;
  }

  if (elevationMetres <= NORMAL_TARGET_ELEVATION) {
    const metresAboveDrawdown = elevationMetres - OPERATING_DRAWDOWN_ELEVATION;
    return (
      STORAGE_AT_OPERATING_DRAWDOWN +
      1.1 * metresAboveDrawdown +
      0.09 * metresAboveDrawdown ** 2
    );
  }

  if (elevationMetres < FLOOD_TARGET_ELEVATION) {
    return (
      NORMAL_STORAGE_MILLION_CUBIC_METRES +
      (MAX_STORAGE_MILLION_CUBIC_METRES - NORMAL_STORAGE_MILLION_CUBIC_METRES) *
        (elevationMetres - NORMAL_TARGET_ELEVATION)
    );
  }

  return MAX_STORAGE_MILLION_CUBIC_METRES;
}

export function storagePercentAtNormalTarget(elevationMetres: number) {
  return Math.min(
    100,
    Math.max(
      0,
      (estimateStorageVolume(elevationMetres) / NORMAL_STORAGE_MILLION_CUBIC_METRES) * 100
    )
  );
}
