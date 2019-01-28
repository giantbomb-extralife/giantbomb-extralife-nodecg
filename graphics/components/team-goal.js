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
const teamGoalRep = nodecg.Replicant('team-goal');
const componentTextColorRep = nodecg.Replicant('component-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbGraphicTeamGoal extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        const amountSpan = shadowRoot.getElementById('amount');
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        teamGoalRep.on('change', (newVal) => {
            amountSpan.textContent = formatDollars(newVal, { cents: false });
        });
        componentTextColorRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.fontSize = `${newVal.teamTotal}px`;
            }
        });
    }
}
customElements.define('gb-team-goal', GbGraphicTeamGoal);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbS1nb2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVhbS1nb2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUtwRCwyQ0FBMkM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsU0FBUyxHQUFHOzs7Ozs7Ozs7Q0FTMUIsQ0FBQztBQUNGLDBDQUEwQztBQUUxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFXLFdBQVcsQ0FBQyxDQUFDO0FBQzVELE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBcUIsc0JBQXNCLENBQUMsQ0FBQztBQUMzRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsV0FBVztJQUN6RDtRQUNDLEtBQUssRUFBRSxDQUFDO1FBRVIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBb0IsQ0FBQztRQUMxRSxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsS0FBSyxJQUFJLENBQUM7UUFFcEYsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFnQixFQUFFLEVBQUU7WUFDN0MsVUFBVSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBMEIsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBQzFCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQWlCLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDO2FBQzlDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIn0=