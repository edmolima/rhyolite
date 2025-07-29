import chalk from 'chalk';

export interface BadgeTemplate {
  official?: boolean;
  community?: boolean;
  popular?: boolean;
}

export function getBadges(json: BadgeTemplate): string {
  let badges = '';
  if (json.official) badges += chalk.bgGreen.black(' OFFICIAL ') + ' ';
  if (json.community) badges += chalk.bgBlue.black(' COMMUNITY ') + ' ';
  if (json.popular) badges += chalk.bgYellow.black(' POPULAR ') + ' ';
  return badges;
}
