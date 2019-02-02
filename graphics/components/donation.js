import BaseDonationItem from '../../shared/components/base-donation-item.js';
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
export default class GbGraphicDonation extends BaseDonationItem {
    constructor(donation) {
        super(donation);
        // tslint:disable-next-line:no-unsafe-any
        this._handleDonationAmountTextColorChanged = this._handleDonationAmountTextColorChanged.bind(this);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLGdCQUFnQixNQUFNLCtDQUErQyxDQUFDO0FBRTdFLDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1EMUIsQ0FBQztBQUNGLDBDQUEwQztBQUUxQyxNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTBCLDRCQUE0QixDQUFDLENBQUM7QUFDeEcsdUJBQXVCLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsZ0JBQWdCO0lBQzlELFlBQVksUUFBa0I7UUFDN0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLHlDQUF5QztRQUN6QyxJQUFJLENBQUMscUNBQXFDLEdBQUcsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDckQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTlELFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFxQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQztRQUN4RyxVQUFVLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBcUIsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN0RixVQUFVLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBcUIsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEcsQ0FBQztJQUVELGlCQUFpQjtRQUNoQix1QkFBdUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRWpGLDBDQUEwQztRQUMxQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7WUFDMUIscUJBQXFCLENBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0I7UUFDbkIsdUJBQXVCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQscUNBQXFDLENBQUMsTUFBYztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDcEYsSUFBSSxxQkFBcUIsRUFBRTtZQUMxQixPQUFPO1NBQ1A7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVyxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQy9FLENBQUM7Q0FDRDtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUMifQ==