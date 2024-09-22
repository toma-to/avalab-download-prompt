import { DateTime } from 'luxon';

export const buildFileName = (originalName: string): string => {
  const baseName = originalName.replace(/^avalab-/, '');

  const today = DateTime.now().toFormat('yyyyMMdd');
  return 'avalab-' + today + '-' + baseName;
};
