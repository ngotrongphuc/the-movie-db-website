import _ from 'lodash';

export const getAvailableYears = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    return _.range(currentYear, startYear - 1, -1);
};
