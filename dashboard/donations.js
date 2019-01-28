'use strict';
// Ours
import GbDashboardDonation from './components/donation.js';
const MAX_DONATIONS_TO_LIST = 20;
const extraLifeIdRep = nodecg.Replicant('extralife-id');
const donationsRep = nodecg.Replicant('donations');
const donationsLinkAnchor = document.getElementById('donationsLink');
const recentDonationsDiv = document.getElementById('recentDonations');
const noDonationsSpan = document.getElementById('noDonations');
extraLifeIdRep.on('change', (newValue) => {
    donationsLinkAnchor.href =
        `https://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=${newValue}`;
});
donationsRep.on('change', (newValue) => {
    if (!newValue) {
        return;
    }
    const newArray = newValue.array;
    if (!Array.isArray(newArray)) {
        return;
    }
    // Remove all existing listings, since we will generate a completely new list.
    recentDonationsDiv.innerHTML = '';
    // Remove the "no donations" message.
    if (noDonationsSpan) {
        noDonationsSpan.remove();
    }
    // Generate and append new donation listings.
    const fragment = document.createDocumentFragment();
    newArray.slice(0, MAX_DONATIONS_TO_LIST).forEach((donation) => {
        const donationElement = new GbDashboardDonation(donation);
        fragment.prepend(donationElement);
    });
    recentDonationsDiv.appendChild(fragment);
    const remainder = newArray.length > 20 ? newArray.length - 20 : 0;
    donationsLinkAnchor.textContent = `And ${remainder} others`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLE9BQU87QUFDUCxPQUFPLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBSTNELE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsY0FBYyxDQUFDLENBQUM7QUFDckUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUU5RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFzQixDQUFDO0FBQzFGLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBbUIsQ0FBQztBQUN4RixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztBQUVsRixjQUFjLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQXFCLEVBQUUsRUFBRTtJQUNyRCxtQkFBbUIsQ0FBQyxJQUFJO1FBQ3ZCLGlHQUFpRyxRQUFRLEVBQUUsQ0FBQztBQUM5RyxDQUFDLENBQUMsQ0FBQztBQUVILFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBbUIsRUFBRSxFQUFFO0lBQ2pELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDZCxPQUFPO0tBQ1A7SUFFRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLE9BQU87S0FDUDtJQUVELDhFQUE4RTtJQUM5RSxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRWxDLHFDQUFxQztJQUNyQyxJQUFJLGVBQWUsRUFBRTtRQUNwQixlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7SUFFRCw2Q0FBNkM7SUFDN0MsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbkQsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFrQixFQUFFLEVBQUU7UUFDdkUsTUFBTSxlQUFlLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLG1CQUFtQixDQUFDLFdBQVcsR0FBRyxPQUFPLFNBQVMsU0FBUyxDQUFDO0FBQzdELENBQUMsQ0FBQyxDQUFDIn0=