import { formatDollars } from '../../shared/utils.js';
/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="amount"></span>
`;
/* tslint:enable:no-trailing-whitespace */
const yourRaisedRep = nodecg.Replicant('your-raised');
const componentTextColorRep = nodecg.Replicant('component-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbGraphicStreamRaised extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        const amountSpan = shadowRoot.getElementById('amount');
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        yourRaisedRep.on('change', (newVal) => {
            amountSpan.textContent = formatDollars(newVal);
        });
        componentTextColorRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.fontSize = `${newVal.streamRaised}px`;
            }
        });
    }
}
customElements.define('gb-stream-raised', GbGraphicStreamRaised);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXJhaXNlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmVhbS1yYWlzZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBS3BELDJDQUEyQztBQUMzQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7OztDQVMxQixDQUFDO0FBQ0YsMENBQTBDO0FBRTFDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsYUFBYSxDQUFDLENBQUM7QUFDbEUsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixzQkFBc0IsQ0FBQyxDQUFDO0FBQzNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksWUFBWSxDQUFDLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sT0FBTyxxQkFBc0IsU0FBUSxXQUFXO0lBQzdEO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDckQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFvQixDQUFDO1FBQzFFLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUVwRixhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQWtCLEVBQUUsRUFBRTtZQUNqRCxVQUFVLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUEwQixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDMUI7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLENBQUM7YUFDakQ7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyJ9