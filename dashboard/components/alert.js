// Ours
import { sleep } from '../../shared/utils.js';
/* tslint:disable:no-trailing-whitespace */
const template = document.createElement('template');
template.innerHTML = `
	<style>
		:host {
  			border: 1px solid transparent;
  			bottom: 0;
  			cursor: pointer;
  			left: 0;
  			opacity: 1;
  			padding: 15px;
  			position: absolute;
  			transition: opacity 150ms ease-in-out;
  			width: 100%;
  			will-change: opacity;
  			z-index: 100;
  		}
  		
  		:host(:not([shown])) {
  			opacity: 0;
  			pointer-events: none;
  		}
  		
  		/* Styles for other alert types can be added later if needed. */
  		:host([type="success"]) {
			background-color: #43ac6a;
			border-color: #3c9a5f;
			color: #ffffff;
  		}
	</style>
	
	<slot></slot>
`;
/* tslint:enable:no-trailing-whitespace */
export default class GbAlert extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        // Dismiss the alert when clicked.
        this.addEventListener('click', () => {
            this.hide();
        });
    }
    async auto() {
        this.show();
        await sleep(600);
        this.hide();
    }
    show() {
        this.setAttribute('shown', 'true');
    }
    hide() {
        this.removeAttribute('shown');
    }
}
customElements.define('gb-alert', GbAlert);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPO0FBQ1AsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTVDLDJDQUEyQztBQUMzQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELFFBQVEsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQThCcEIsQ0FBQztBQUNGLDBDQUEwQztBQUUxQyxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxXQUFXO0lBQy9DO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDckQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXpELGtDQUFrQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFJO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUk7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRDtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=