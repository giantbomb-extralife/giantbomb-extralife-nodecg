/* tslint:disable:no-trailing-whitespace */
const shadowTemplate = document.createElement('template');
shadowTemplate.innerHTML = `
	<style>
		:host {
			font-family: 'Montserrat', sans-serif;
			font-weight: 400;
  		}
	</style>
	
	<span id="time"></span>
`;
/* tslint:enable:no-trailing-whitespace */
const numeral = window.numeral;
const timerDisplayValueRep = nodecg.Replicant('timerDisplayValue');
const timerNegativeRep = nodecg.Replicant('timerNegative');
const componentTextColorRep = nodecg.Replicant('component-text-color');
const fontSizesRep = nodecg.Replicant('font-sizes');
export default class GbGraphicTimer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
        const timeSpan = shadowRoot.getElementById('time');
        const ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        timerDisplayValueRep.on('change', (newVal) => {
            let time = numeral(newVal).format('00:00:00'); // tslint:disable-line:no-unsafe-any
            if (timerNegativeRep.value) {
                time = '-' + time;
            }
            timeSpan.textContent = time;
        });
        timerNegativeRep.on('change', (newVal) => {
            const tm = timeSpan.textContent || '';
            if (newVal && tm.length > 0 && tm[0] !== '-') {
                timeSpan.textContent = '-' + tm;
            }
            else if (!newVal && tm.length > 0 && tm[0] === '-') {
                timeSpan.textContent = tm.slice(1);
            }
        });
        componentTextColorRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.color = newVal;
            }
        });
        fontSizesRep.on('change', (newVal) => {
            if (!ignoreReplicantStyles) {
                this.style.fontSize = `${newVal.timer}px`;
            }
        });
    }
}
customElements.define('gb-timer', GbGraphicTimer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSwyQ0FBMkM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsU0FBUyxHQUFHOzs7Ozs7Ozs7Q0FTMUIsQ0FBQztBQUNGLDBDQUEwQztBQUUxQyxNQUFNLE9BQU8sR0FBSSxNQUFjLENBQUMsT0FBTyxDQUFDO0FBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQztBQUN0RixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWdCLGVBQWUsQ0FBQyxDQUFDO0FBQzFFLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBcUIsc0JBQXNCLENBQUMsQ0FBQztBQUMzRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFDdEQ7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQUVSLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNyRCxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFL0QsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQW9CLENBQUM7UUFDdEUsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEtBQUssSUFBSSxDQUFDO1FBRXBGLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUF5QixFQUFFLEVBQUU7WUFDL0QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQVcsQ0FBQyxDQUFDLG9DQUFvQztZQUM3RixJQUFJLGdCQUFnQixDQUFDLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFFRCxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFxQixFQUFFLEVBQUU7WUFDdkQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFDdEMsSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDN0MsUUFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ2hDO2lCQUFNLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDckQsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBMEIsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBQzFCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQWlCLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDO2FBQzFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyJ9