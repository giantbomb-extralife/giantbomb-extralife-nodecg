'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 */
function formatDollars(amount, { cents = true } = {}) {
    const fractionDigits = cents ? 2 : 0;
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return parsedAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits
    });
}
exports.formatDollars = formatDollars;
/**
 * A very simple and naive clone method that can be used in the browser.
 */
function clone(input) {
    return JSON.parse(JSON.stringify(input));
}
exports.clone = clone;
//# sourceMappingURL=utils.js.map