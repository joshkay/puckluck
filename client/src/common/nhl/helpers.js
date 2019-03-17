import moment from 'moment';

export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const logoUrl = (id) => `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`;

export const activeDate = moment().subtract(5 , 'hours');