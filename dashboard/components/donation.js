import BaseDonationItem from '../../shared/components/base-donation-item.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
		
		::slotted(.donation) {
			color: black;
			word-break: break-word;
			word-wrap: break-word;
		}
	</style>
	
	<slot></slot>
`;
const lightTemplate = document.createElement('template');
lightTemplate.innerHTML = `	
	<div class="donation list-group-item">
		<h4 class="donation__body list-group-item-heading" style="float: left;"></h4>
		<p class="donation__timestamp list-group-item-heading" style="float: right;"></p>
		<p class="donation__message list-group-item-text" style="clear: both;"></p>
	</div>
`;
/* tslint:enable:no-trailing-whitespace */
const TIMESTAMP_UPDATE_INTERVAL_TIME = 1000;
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const rtf = new Intl.RelativeTimeFormat('en', {
    style: 'narrow',
    numeric: 'auto'
});
export default class GbDashboardDonation extends BaseDonationItem {
    constructor(donation) {
        super(donation);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        // Use Light DOM, so that the bootstrap styles can be applied.
        this.appendChild(lightTemplate.content.cloneNode(true));
        this.querySelector('.donation__body').textContent = (donation.displayName || 'Anonymous') + (donation.amount ? (' - ' + donation.amount) : '');
        this.querySelector('.donation__message').textContent = donation.message || '';
        this.updateTimestamp();
    }
    connectedCallback() {
        this.style.opacity = '1';
        this._timestampUpdateInterval = setInterval(() => {
            this.updateTimestamp();
        }, TIMESTAMP_UPDATE_INTERVAL_TIME); // tslint:disable-line:align
    }
    disconnectedCallback() {
        clearInterval(this._timestampUpdateInterval); // tslint:disable-line:no-unsafe-any
    }
    updateTimestamp() {
        if (!this.donation) {
            return;
        }
        const donationTimestamp = Date.parse(this.donation.createdDateUTC);
        const millisecondsSinceDonation = donationTimestamp - Date.now();
        const absoluteMilliseconds = Math.abs(millisecondsSinceDonation);
        let amount = millisecondsSinceDonation / 1000;
        let unit = 'second';
        if (absoluteMilliseconds >= ONE_DAY) {
            unit = 'day';
            amount = millisecondsSinceDonation / ONE_DAY;
        }
        else if (absoluteMilliseconds >= ONE_HOUR) {
            unit = 'hour';
            amount = millisecondsSinceDonation / ONE_HOUR;
        }
        else if (absoluteMilliseconds >= ONE_MINUTE) {
            unit = 'minute';
            amount = millisecondsSinceDonation / ONE_MINUTE;
        }
        // tslint:disable-next-line:no-unsafe-any
        this.querySelector('.donation__timestamp').textContent = rtf.format(Math.round(amount), unit);
    }
}
customElements.define('gb-donation', GbDashboardDonation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGdCQUFnQixNQUFNLCtDQUErQyxDQUFDO0FBRTdFLDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCMUIsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekQsYUFBYSxDQUFDLFNBQVMsR0FBRzs7Ozs7O0NBTXpCLENBQUM7QUFDRiwwQ0FBMEM7QUFFMUMsTUFBTSw4QkFBOEIsR0FBRyxJQUFJLENBQUM7QUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUM3QixNQUFNLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSyxJQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO0lBQ3RELEtBQUssRUFBRSxRQUFRO0lBQ2YsT0FBTyxFQUFFLE1BQU07Q0FDZixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUdoRSxZQUFZLFFBQWtCO1FBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDckQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9ELDhEQUE4RDtRQUM5RCxJ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