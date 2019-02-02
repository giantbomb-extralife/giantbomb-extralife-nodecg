import GbGraphicDonation from './donation.js';
import BaseDonationList from '../../shared/components/base-donation-list.js';
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
const showDonationCommentsRep = nodecg.Replicant('show-donation-comments');
const componentTextColorRep = nodecg.Replicant('component-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbDonationsList extends BaseDonationList {
    constructor() {
        super();
        this.donationItemElementTag = 'gb-donation'; // tslint:disable-line:typedef
        this.donationItemElementClass = GbGraphicDonation; // tslint:disable-line:typedef
        this.shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        showDonationCommentsRep.on('change', (newValue) => {
            if (newValue === false) {
                this.setAttribute('hide-comments', '');
            }
            else {
                this.removeAttribute('hide-comments');
            }
        });
        componentTextColorRep.on('change', (newVal) => {
            if (!this._ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!this._ignoreReplicantStyles) {
                this.style.setProperty('--donation-name-font-size', `${newVal.donations}px`);
                this.style.setProperty('--donation-amount-font-size', `${newVal.donations}px`);
                this.style.setProperty('--donation-message-font-size', `${newVal.donations * (2 / 3)}px`);
            }
        });
    }
}
customElements.define('gb-donations-list', GbDonationsList);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb25hdGlvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLGlCQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLGdCQUFnQixNQUFNLCtDQUErQyxDQUFDO0FBRTdFLDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7OztDQU0xQixDQUFDO0FBQ0YsMENBQTBDO0FBRTFDLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsd0JBQXdCLENBQUMsQ0FBQztBQUNqRyxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLHNCQUFzQixDQUFDLENBQUM7QUFDM0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxZQUFZLENBQUMsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZ0JBQWdCO0lBSTVEO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFKVCwyQkFBc0IsR0FBRyxhQUFhLENBQUMsQ0FBQyw4QkFBOEI7UUFDdEUsNkJBQXdCLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyw4QkFBOEI7UUFLM0UsSUFBSSxDQUFDLFVBQVcsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRSx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBOEIsRUFBRSxFQUFFO1lBQ3ZFLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN0QztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQXFCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQTBCLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDMUI7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7Z0JBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUY7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxDQUFDLENBQUMifQ==