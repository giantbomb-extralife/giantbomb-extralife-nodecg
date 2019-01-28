import { clone } from '../../shared/utils.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			word-break: break-word;
			word-wrap: break-word;
  			height: var(--donation-height, auto);
  			line-height: var(--donation-line-height, 1.5em);
  			opacity: 0;
  			transition: opacity 150ms ease-in-out;
  			will-change: opacity;
  		}
  		
  		#name {
			float: left;
			font-size: var(--donation-name-font-size, 18px);
			max-width: var(--donation-name-max-width, 200px);
			overflow: hidden;
			white-space: nowrap;
  		}
  		
  		#amount {
			color: #00e1ff;
			float: right;
			font-size: var(--donation-amount-font-size, 18px);
  		}
  		
		#message { 
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			box-sizing: border-box;
			clear: both;
			display: var(--donation-message-display, -webkit-box);
			font-size: var(--donation-message-font-size, 12px);
			line-height: 1.2em;
			margin: 0 auto;
			max-height: 3em;
			opacity: 0.5;
			overflow: hidden;
			padding-left: var(--donation-message-padding-left, 10px);
			text-align: initial;
			text-overflow: ellipsis;
			width: 100%;
		}
	</style>
	
	<div>
		<span id="name"></span>
		<span id="amount"></span>
		<span id="message"></span>
	</div>
`;
/* tslint:enable:no-trailing-whitespace */
const donationAmountTextColor = nodecg.Replicant('donation-amount-text-color');
donationAmountTextColor.setMaxListeners(50);
export default class GbGraphicDonation extends HTMLElement {
    constructor(donation) {
        super();
        // tslint:disable-next-line:no-unsafe-any
        this._handleDonationAmountTextColorChanged = this._handleDonationAmountTextColorChanged.bind(this);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        // Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
        this.donation = clone(donation);
        shadowRoot.getElementById('name').textContent = donation.displayName || 'Anonymous';
        shadowRoot.getElementById('amount').textContent = donation.amount;
        shadowRoot.getElementById('message').textContent = donation.message || '';
    }
    connectedCallback() {
        donationAmountTextColor.on('change', this._handleDonationAmountTextColorChanged);
        // Double rAF required for correct timing.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.style.opacity = '1';
            });
        });
    }
    disconnectedCallback() {
        donationAmountTextColor.removeListener('change', this._handleDonationAmountTextColorChanged);
    }
    _handleDonationAmountTextColorChanged(newVal) {
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        if (ignoreReplicantStyles) {
            return;
        }
        const shadowRoot = this.shadowRoot;
        shadowRoot.getElementById('amount').style.color = newVal;
    }
}
customElements.define('gb-donation', GbGraphicDonation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJNUMsMkNBQTJDO0FBQzNDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUQsY0FBYyxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUQxQixDQUFDO0FBQ0YsMENBQTBDO0FBRTFDLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBMEIsNEJBQTRCLENBQUMsQ0FBQztBQUN4Ryx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQkFBa0IsU0FBUSxXQUFXO0lBR3pELFlBQVksUUFBa0I7UUFDN0IsS0FBSyxFQUFFLENBQUM7UUFFUix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkcsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvRCwyRkFBMkY7UUFDM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQXFCLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDO1FBQ3hHLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFxQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3RGLFVBQVUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFxQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoRyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2hCLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFFakYsMENBQTBDO1FBQzFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUMxQixxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9CQUFvQjtRQUNuQix1QkFBdUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxxQ0FBcUMsQ0FBQyxNQUFjO1FBQ25ELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNwRixJQUFJLHFCQUFxQixFQUFFO1lBQzFCLE9BQU87U0FDUDtRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUM7UUFDbkMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXFCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDL0UsQ0FBQztDQUNEO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyJ9