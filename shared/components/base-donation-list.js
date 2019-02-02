const MAX_DONATIONS_TO_LIST = 20;
const donationsRep = nodecg.Replicant('donations');
export default class BaseDonationList extends HTMLElement {
    constructor() {
        super();
        this._initial = true; // tslint:disable-line:typedef
        this._pollInterval = 30 * 10; // tslint:disable-line:typedef
        this.feed = this.getAttribute('feed') || 'approved';
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
            this._root.querySelectorAll(this.donationItemElementTag).forEach((donationElem) => {
                donationElem.remove();
            });
            this._initial = true;
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
            const feedIndex = donationsInFeed.findIndex(donation => {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kb25hdGlvbi1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS1kb25hdGlvbi1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sT0FBZ0IsZ0JBQWlCLFNBQVEsV0FBVztJQW9CakU7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQUxELGFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyw4QkFBOEI7UUFDdEMsa0JBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsOEJBQThCO1FBTXZFLElBQUksQ0FBQyxJQUFJLEdBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQXFCLElBQUksVUFBVSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSxDQUFDO1FBRXpFLHdDQUF3QztRQUN4QyxtRkFBbUY7UUFDbkYsK0JBQStCO1FBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ2hFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFN0MsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFtQixFQUFFLEVBQUU7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