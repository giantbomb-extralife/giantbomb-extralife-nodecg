/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="link"></span>
`;
/* tslint:enable:no-trailing-whitespace */
const donationLinkRep = nodecg.Replicant('donation-link');
const donationLinkTextColorRep = nodecg.Replicant('donation-link-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbGraphicDonationLink extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        const linkSpan = shadowRoot.getElementById('link');
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        donationLinkRep.on('change', (newVal) => {
            linkSpan.textContent = newVal;
        });
        donationLinkTextColorRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.fontSize = `${newVal.donationLink}px`;
            }
        });
    }
}
customElements.define('gb-donation-link', GbGraphicDonationLink);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24tbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbmF0aW9uLWxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsMkNBQTJDO0FBQzNDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUQsY0FBYyxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7O0NBUzFCLENBQUM7QUFDRiwwQ0FBMEM7QUFFMUMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBZSxlQUFlLENBQUMsQ0FBQztBQUN4RSxNQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXdCLDBCQUEwQixDQUFDLENBQUM7QUFDckcsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxZQUFZLENBQUMsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxPQUFPLHFCQUFzQixTQUFRLFdBQVc7SUFDN0Q7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQUVSLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNyRCxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFL0QsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQW9CLENBQUM7UUFDdEUsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEtBQUssSUFBSSxDQUFDO1FBRXBGLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQ3JELFFBQVEsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQTZCLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUMxQjtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFpQixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksQ0FBQzthQUNqRDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNEO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIn0=