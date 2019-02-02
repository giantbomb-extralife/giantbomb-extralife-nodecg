'use strict';
const MAX_DONATIONS_TO_LIST = 20;
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
    const newArray = newValue.array;
    if (!Array.isArray(newArray)) {
        return;
    }
    // Remove the "no donations" message.
    if (noDonationsSpan) {
        noDonationsSpan.remove();
    }
    const remainder = newArray.length > MAX_DONATIONS_TO_LIST ? newArray.length - MAX_DONATIONS_TO_LIST : 0;
    donationsLinkAnchor.textContent = `And ${remainder} others`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9uYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQU1iLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsY0FBYyxDQUFDLENBQUM7QUFDckUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUU5RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFzQixDQUFDO0FBQzFGLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO0FBRWxGLGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBcUIsRUFBRSxFQUFFO0lBQ3JELG1CQUFtQixDQUFDLElBQUk7UUFDdkIsaUdBQWlHLFFBQVEsRUFBRSxDQUFDO0FBQzlHLENBQUMsQ0FBQyxDQUFDO0FBRUgsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFtQixFQUFFLEVBQUU7SUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNkLE9BQU87S0FDUDtJQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0IsT0FBTztLQUNQO0lBRUQscUNBQXFDO0lBQ3JDLElBQUksZUFBZSxFQUFFO1FBQ3BCLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6QjtJQUVELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RyxtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsT0FBTyxTQUFTLFNBQVMsQ0FBQztBQUM3RCxDQUFDLENBQUMsQ0FBQyJ9