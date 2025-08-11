/**
 * @typedef {"green"|"yellow"|"red"} BadgeColor
 */

/**
 * @typedef Badge
 * @property {BadgeColor} color
 * @property {number} number
 */

/**
 * @typedef Indicators
 * @property {number} [pkgSends]
 * @property {number} [whatsapp]
 * @property {number} [new]
 * @property {number} [email]
 */

/**
 * @typedef RowData
 * @property {number} id
 * @property {string} name
 * @property {Badge} badge
 * @property {[number, number]} calls
 * @property {[number, number]} pkgSends
 * @property {[number, number]} whatsapp
 * @property {[number, number]} new
 * @property {[number, number]} email
 * @property {Indicators} indicators
 */

/**
 * @typedef Column
 * @property {"calls"|"pkgSends"|"whatsapp"|"new"|"email"} key
 * @property {import("react").ReactNode} icon
 * @property {string} label
 */

/**
 * @typedef SummaryData
 * @property {{color:BadgeColor, number:number}[]} badges
 * @property {{
*   calls: [number, number, number, number],
*   pkgSends: [number, number, number, number],
*   whatsapp: [number, number, number, number],
*   new: [number, number, number, number],
*   email: [number, number, number, number]
* }} totals
* @property {{
*   pkgSends: { top: number, bottom: number },
*   new:      { top: number, bottom: number }
* }} summaryIndicators
*/

// This file provides JSDoc type definitions for your communication table data structures.
// No runtime exports are needed.
