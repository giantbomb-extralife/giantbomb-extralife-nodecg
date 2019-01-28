'use strict';
/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 */
export function formatDollars(amount, { cents = true } = {}) {
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
export function clone(input) {
    return JSON.parse(JSON.stringify(input));
}
/**
 * A very simple sleep delay function.
 */
export async function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds); // tslint:disable-line:align
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FDNUIsTUFBdUIsRUFDdkIsRUFBQyxLQUFLLEdBQUcsSUFBSSxLQUEwQixFQUFFO0lBRXpDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsTUFBTSxZQUFZLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5RSxPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO1FBQzNDLEtBQUssRUFBRSxVQUFVO1FBQ2pCLFFBQVEsRUFBRSxLQUFLO1FBQ2YscUJBQXFCLEVBQUUsY0FBYztRQUNyQyxxQkFBcUIsRUFBRSxjQUFjO0tBQ3JDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUksS0FBUTtJQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBTSxDQUFDO0FBQy9DLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsS0FBSyxDQUFDLFlBQW9CO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsNEJBQTRCO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9