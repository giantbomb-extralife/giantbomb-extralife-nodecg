// Packages
import { clone } from '../../shared/utils.js';
export default class BaseDonationItem extends HTMLElement {
    constructor(donation, feed) {
        super();
        // Defensive clone to de-proxy and de-reference the object, since it came from a replicant.
        this.donation = clone(donation);
        this.feed = feed;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kb25hdGlvbi1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS1kb25hdGlvbi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVc7QUFDWCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFLNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxXQUFXO0lBSXhELFlBQVksUUFBa0IsRUFBRSxJQUFxQjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUVSLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0NBQ0QifQ==