/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 */
export declare function formatDollars(amount: number | string, { cents }?: {
    cents?: boolean;
}): string;
/**
 * A very simple and naive clone method that can be used in the browser.
 */
export declare function clone<T>(input: T): T;
/**
 * A very simple sleep delay function.
 */
export declare function sleep(milliseconds: number): Promise<void>;
