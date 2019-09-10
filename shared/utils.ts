'use strict';

/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 */
export function formatDollars(
	amount: number | string,
	{cents = true}: { cents?: boolean } = {}
): string {
	const fractionDigits = cents ? 2 : 0;
	const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
	return parsedAmount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits
	});
}

/**
 * A very simple and naive clone method that can be used in the browser.
 */
export function clone<T>(input: T): T {
	return JSON.parse(JSON.stringify(input)) as T;
}

/**
 * A very simple sleep delay function.
 */
export async function sleep(milliseconds: number): Promise<void> {
	return new Promise(resolve => { // tslint:disable-line:typedef
		setTimeout(() => {
			resolve();
		}, milliseconds); // tslint:disable-line:align
	});
}
