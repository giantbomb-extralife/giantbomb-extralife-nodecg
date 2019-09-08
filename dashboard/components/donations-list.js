import GbDashboardDonation from './donation.js';
import BaseDonationList from '../../shared/components/base-donation-list.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			display: block;
		}
	</style>

	<slot></slot>
`;
/* tslint:enable:no-trailing-whitespace */
export default class GbDonationsList extends BaseDonationList {
    constructor() {
        super();
        this.donationItemElementTag = 'gb-donation'; // tslint:disable-line:typedef
        this.donationItemElementClass = GbDashboardDonation; // tslint:disable-line:typedef
        this.shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
    }
}
customElements.define('gb-donations-list', GbDonationsList);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG1CQUFtQixNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLGdCQUFnQixNQUFNLCtDQUErQyxDQUFDO0FBRTdFLDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7O0NBUTFCLENBQUM7QUFDRiwwQ0FBMEM7QUFFMUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGdCQUFnQjtJQUk1RDtRQUNDLEtBQUssRUFBRSxDQUFDO1FBSlQsMkJBQXNCLEdBQUcsYUFBYSxDQUFDLENBQUMsOEJBQThCO1FBQ3RFLDZCQUF3QixHQUFHLG1CQUFtQixDQUFDLENBQUMsOEJBQThCO1FBSzdFLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNEO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLENBQUMsQ0FBQyJ9