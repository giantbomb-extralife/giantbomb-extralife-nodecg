import BaseDonationItem from '../../shared/components/base-donation-item.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			border-radius: 4px;
			display: flex;
			margin-bottom: 8px;
			overflow: hidden;
  			flex: none;
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
  		:host(:last-child) {
			margin-bottom: 0;
		}
  		
		::slotted(.donation) {
			border-radius: 0 !important;
			color: black;
			flex: 1;
			word-break: break-word;
			word-wrap: break-word;
		}
		
		::slotted(button) {
			display: flex !important;
			flex-direction: column;
			border: none !important;
			border-radius: 0 !important;
			width: 70px;
			font-weight: bold !important;
			justify-content: center;
			align-items: center;
		}
	</style>
	
	<slot></slot>
`;
const lightTemplate = document.createElement('template');
lightTemplate.innerHTML = `		
	<button class="donation__reject btn btn-danger">
		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
		<span class="donation__reject__text">Reject</span>
	</button>
	
	<div class="donation list-group-item">
		<h4 class="donation__body list-group-item-heading" style="float: left;"></h4>
		<p class="donation__timestamp list-group-item-heading" style="float: right;"></p>
		<p class="donation__message list-group-item-text" style="clear: both;"></p>
	</div>
	
	<button class="donation__accept btn btn-success">
		<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
		<span class="donation__accept__text">Accept</span>
	</button>
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
    constructor(donation, feed) {
        super(donation, feed);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        // Use Light DOM, so that the bootstrap styles can be applied.
        this.appendChild(lightTemplate.content.cloneNode(true));
        this.querySelector('.donation__body').textContent = (donation.displayName || 'Anonymous') + (donation.amount ? (' - ' + donation.amount) : '');
        this.querySelector('.donation__message').textContent = donation.message || '';
        this.updateTimestamp();
        const rejectBtn = this.querySelector('.donation__reject');
        const acceptBtn = this.querySelector('.donation__accept');
        if (feed === 'rejected') {
            rejectBtn.remove();
            acceptBtn.querySelector('.donation__accept__text').textContent = 'Pend';
        }
        else {
            rejectBtn.addEventListener('click', () => {
                switch (feed) {
                    case 'pending':
                        nodecg.sendMessage('rejectDonation', this.donation.donorID);
                        break;
                    case 'approved':
                        nodecg.sendMessage('unapproveDonation', this.donation.donorID);
                        break;
                    default:
                    // Do nothing.
                }
            });
        }
        if (feed === 'approved') {
            rejectBtn.querySelector('.donation__reject__text').textContent = 'Pend';
            acceptBtn.remove();
        }
        else {
            acceptBtn.addEventListener('click', () => {
                switch (feed) {
                    case 'rejected':
                        nodecg.sendMessage('unrejectDonation', this.donation.donorID);
                        break;
                    case 'pending':
                        nodecg.sendMessage('approveDonation', this.donation.donorID);
                        break;
                    default:
                    // Do nothing.
                }
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGdCQUFnQixNQUFNLCtDQUErQyxDQUFDO0FBRTdFLDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0MxQixDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN6RCxhQUFhLENBQUMsU0FBUyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0J6QixDQUFDO0FBQ0YsMENBQTBDO0FBRTFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxDQUFDO0FBQzVDLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDN0IsTUFBTSxRQUFRLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNqQyxNQUFNLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUssSUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRTtJQUN0RCxLQUFLLEVBQUUsUUFBUTtJQUNmLE9BQU8sRUFBRSxNQUFNO0NBQ2YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFHaEUsWUFBWSxRQUFrQixFQUFFLElBQXFCO1FBQ3BELEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FB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