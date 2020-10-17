'use strict';

/**
 * Check trimmed string length.
 * @param field string
 * @returns Boolean
 */
export const isEmpty = (field) => field.trim() === '';

/**
 * Check is field exist
 * @param {*} field
 * @returns {boolean}
 */
export const isExist = (field) => field !== undefined;
