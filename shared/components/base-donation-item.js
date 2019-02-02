// Packages
import { clone } from '../../shared/utils.js';
export default class BaseDonationItem extends HTMLElement {
    constructor(donation) {
        super();
        // Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
        this.donation = clone(donation);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kb25hdGlvbi1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS1kb25hdGlvbi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVc7QUFDWCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFLNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxXQUFXO0lBR3hELFlBQVksUUFBa0I7UUFDN0IsS0FBSyxFQUFFLENBQUM7UUFFUiwyRkFBMkY7UUFDM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNEIn0=