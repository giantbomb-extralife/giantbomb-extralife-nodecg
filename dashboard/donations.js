'use strict';
const extraLifeIdRep = nodecg.Replicant('extralife-id');
const donationsRep = nodecg.Replicant('donations');
const donationsLinkAnchor = document.getElementById('donationsLink');
const noDonationsSpan = document.getElementById('noDonations');
extraLifeIdRep.on('change', (newValue) => {
    donationsLinkAnchor.href =
        `https://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&participantID=${newValue}`;
});
donationsRep.on('change', (newValue) => {
    if (!newValue) {
        return;
    }
    const newArray = newValue.approved;
    if (!Array.isArray(newArray)) {
        return;
    }
    // Remove the "no donations" message.
    if (noDonationsSpan) {
        noDonationsSpan.remove();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQU1iLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsY0FBYyxDQUFDLENBQUM7QUFDckUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUU5RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFzQixDQUFDO0FBQzFGLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO0FBRWxGLGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBcUIsRUFBRSxFQUFFO0lBQ3JELG1CQUFtQixDQUFDLElBQUk7UUFDdkIsaUdBQWlHLFFBQVEsRUFBRSxDQUFDO0FBQzlHLENBQUMsQ0FBQyxDQUFDO0FBRUgsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFtQixFQUFFLEVBQUU7SUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNkLE9BQU87S0FDUDtJQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0IsT0FBTztLQUNQO0lBRUQscUNBQXFDO0lBQ3JDLElBQUksZUFBZSxFQUFFO1FBQ3BCLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6QjtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=