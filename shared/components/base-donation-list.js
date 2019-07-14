const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant('donations');
export default class BaseDonationList extends HTMLElement {
    constructor() {
        super();
        this.feed = 'approved';
        this._initial = true; // tslint:disable-line:typedef
        this._pollInterval = 30 * 10; // tslint:disable-line:typedef
        const feedAttributeValue = this.getAttribute('feed');
        this.feed = feedAttributeValue || 'approved';
        this._ignoreReplicantStyles = this.getAttribute('ignore-replicant-styles') !== null;
        this._meteredInsertion = this.getAttribute('metered-insertion') !== null;
        // Graphics will want to use Shadow DOM.
        // However, some Dashboard panels may want to use Light DOM, for Bootstrap styling.
        // This is how we support both.
        const useLightDom = this.getAttribute('use-light-dom') !== null;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this._root = useLightDom ? this : shadowRoot;
        donationsRep.on('change', (newValue) => {
            this.parseDonations(newValue);
        });
    }
    parseDonations(donationsData) {
        if (!donationsData) {
            return;
        }
        const newArray = donationsData[this.feed];
        if (!Array.isArray(newArray)) {
            return;
        }
        if (newArray.length === 0) {
            this.clearAllDonations();
        }
        this.removeExpiredDonations();
        // Create an array of donation which we don't already have in our list.
        let pass = false;
        const mostRecentDonationElement = this._root.querySelector(this.donationItemElementTag);
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
        // Insert the new donations into our list.
        let j = 0;
        let bucketCounter = 1;
        const intervals = (temporary.length > 0 && temporary.length <= this._pollInterval) ?
            Math.floor(this._pollInterval / temporary.length) : 1;
        const bucket = temporary.length > this._pollInterval ? Math.ceil(temporary.length / this._pollInterval) : 1;
        temporary.forEach((donation) => {
            // If this is the initial page load,
            // OR if the `metered-insertion` attribute is falsey,
            // insert all donations at once.
            //
            // ELSE, meter out the insertion of donations over time, to
            // give each donation a bit of time to be read.
            if (this._initial || !this._meteredInsertion) {
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
        this.limitDisplayedDonations();
        this._initial = false;
    }
    createAndInsertDonationElement(donation) {
        // Create the new donation element.
        // When doing so, forward the ignore-replicant-styles attribute, if it has been set.
        const donationElement = new this.donationItemElementClass(donation, this.feed);
        if (this._ignoreReplicantStyles) {
            donationElement.setAttribute('ignore-replicant-styles', '');
        }
        // Check if our shadow root has a <style> tag.
        // If so, insert the new donation element immediately after that <style> tag.
        // Else, just insert the new donation element as the first element.
        //
        // The goal here is to always insert the new donation element before other
        // donation elements, but after any <style> tags.
        const styleElem = this._root.querySelector('style:last-of-type');
        if (styleElem) {
            styleElem.insertAdjacentElement('afterend', donationElement);
        }
        else {
            this._root.prepend(donationElement);
        }
    }
    removeExpiredDonations() {
        if (!donationsRep.value) {
            return;
        }
        // Remove excess donation elements.
        const allDonationElements = Array.from(this._root.querySelectorAll(this.donationItemElementTag));
        const donationsInFeed = donationsRep.value[this.feed];
        allDonationElements.forEach((donationElement) => {
            // Find this element's donation in our feed.
            const feedIndex = donationsInFeed.findIndex((donation) => {
                return donation.donorID === donationElement.donation.donorID;
            });
            // If this element's donation is not in our feed, we consider it "expired".
            // Remove it from the DOM.
            if (feedIndex < 0) {
                donationElement.remove();
            }
        });
    }
    limitDisplayedDonations() {
        const allDonationElements = Array.from(this._root.querySelectorAll(this.donationItemElementTag));
        const excessDonationElements = allDonationElements.slice(MAX_DONATIONS_TO_LIST);
        excessDonationElements.forEach((element) => {
            element.remove();
        });
    }
    clearAllDonations() {
        this._root.querySelectorAll(this.donationItemElementTag).forEach((donationElem) => {
            donationElem.remove();
        });
        this._initial = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kb25hdGlvbi1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS1kb25hdGlvbi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sT0FBZ0IsZ0JBQWlCLFNBQVEsV0FBVztJQW9CakU7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQXBCVCxTQUFJLEdBQW9CLFVBQVUsQ0FBQztRQWUzQixhQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsOEJBQThCO1FBQ3RDLGtCQUFhLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLDhCQUE4QjtRQU12RSxNQUFNLGtCQUFrQixHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFxQixDQUFDO1FBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLElBQUksVUFBVSxDQUFDO1FBRTdDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxDQUFDO1FBRXpFLHdDQUF3QztRQUN4QyxtRkFBbUY7UUFDbkYsK0JBQStCO1FBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ2hFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFV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