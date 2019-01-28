import GbGraphicDonation from './donation.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>  		
  		:host([hide-comments]) .donation {
  			--donation-message-display: none;
  		}
	</style>
`;
/* tslint:enable:no-trailing-whitespace */
const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant('donations');
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments');
const componentTextColorRep = nodecg.Replicant('component-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbDonationsList extends HTMLElement {
    constructor() {
        super();
        this._initial = true; // tslint:disable-line:typedef
        this._pollInterval = 30 * 10; // tslint:disable-line:typedef
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        this._ignoreReplicantStyles = ignoreReplicantStyles;
        showDonationCommentsRep.on('change', (newValue) => {
            if (newValue === false) {
                this.setAttribute('hide-comments', '');
            }
            else {
                this.removeAttribute('hide-comments');
            }
        });
        donationsRep.on('change', (newValue) => {
            this.parseDonations(newValue);
        });
        componentTextColorRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.setProperty('--donation-name-font-size', `${newVal.donations}px`);
                this.style.setProperty('--donation-amount-font-size', `${newVal.donations}px`);
                this.style.setProperty('--donation-message-font-size', `${newVal.donations * (2 / 3)}px`);
            }
        });
    }
    parseDonations(donationsData) {
        if (!donationsData) {
            return;
        }
        const newArray = donationsData.array;
        if (!Array.isArray(newArray)) {
            return;
        }
        if (newArray.length === 0 || donationsData.clear) {
            this.shadowRoot.querySelectorAll('gb-donation').forEach((donationElem) => {
                donationElem.remove();
            });
            this._initial = true;
        }
        let pass = false;
        const mostRecentDonationElement = this.shadowRoot.querySelector('gb-donation');
        const mostRecentShowingDonationId = mostRecentDonationElement ?
            mostRecentDonationElement.donation.donorID :
            undefined;
        const temporary = [];
        for (let i = newArray.length - 1; i >= 0; i--) {
            const donation = newArray[i];
            if (donation.donorID === mostRecentShowingDonationId || pass) {
                pass = true;
                continue;
            }
            temporary.unshift(donation);
        }
        let j = 0;
        let bucketCounter = 1;
        const intervals = (temporary.length > 0 && temporary.length <= this._pollInterval) ?
            Math.floor(this._pollInterval / temporary.length) : 1;
        const bucket = temporary.length > this._pollInterval ? Math.ceil(temporary.length / this._pollInterval) : 1;
        temporary.forEach((donation) => {
            if (this._initial) {
                this.createAndInsertDonationElement(donation);
            }
            else {
                setTimeout(() => {
                    this.createAndInsertDonationElement(donation);
                }, j * intervals * 100); // tslint:disable-line:align
            }
            if ((bucketCounter % bucket) === 0) {
                j++;
            }
            bucketCounter++;
        });
        this._initial = false;
    }
    createAndInsertDonationElement(donation) {
        // Create the new donation element.
        const donationElement = new GbGraphicDonation(donation);
        if (this._ignoreReplicantStyles) {
            donationElement.setAttribute('ignore-replicant-styles', '');
        }
        donationElement.classList.add('donation');
        // Insert it just after the <style> tag in our shadow root.
        // This will put it before all other elements.
        const styleElem = this.shadowRoot.querySelector('style');
        styleElem.insertAdjacentElement('afterend', donationElement);
        // Remove excess donation elements.
        const allDonationElements = Array.from(this.shadowRoot.querySelectorAll('gb-donation'));
        const excessDonationElements = allDonationElements.slice(MAX_DONATIONS_TO_LIST);
        excessDonationElements.forEach((element) => {
            element.remove();
        });
    }
}
customElements.define('gb-donations-list', GbDonationsList);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLGlCQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU5QywyQ0FBMkM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsU0FBUyxHQUFHOzs7Ozs7Q0FNMUIsQ0FBQztBQUNGLDBDQUEwQztBQUUxQyxNQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQzlELE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsd0JBQXdCLENBQUMsQ0FBQztBQUNqRyxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLHNCQUFzQixDQUFDLENBQUM7QUFDM0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxZQUFZLENBQUMsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsV0FBVztJQUt2RDtRQUNDLEtBQUssRUFBRSxDQUFDO1FBTEQsYUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLDhCQUE4QjtRQUN0QyxrQkFBYSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7UUFNdkUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsS0FBSyxJ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