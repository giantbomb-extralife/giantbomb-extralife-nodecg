// Ours
import {Donations} from '../types/schemas/donations';

const donationsRep = nodecg.Replicant<Donations>('donations');
donationsRep.on('change', (newVal: Donations) => {
	if (!newVal) {
		return;
	}

	document.getElementById('rejectedCount')!.textContent = `- ${newVal.rejected.length}`;
	document.getElementById('pendingCount')!.textContent = `- ${newVal.pending.length}`;
	document.getElementById('approvedCount')!.textContent = `- ${newVal.approved.length}`;
});

window.addEventListener('load', () => {
	// For some reason, this list gets scrolled to the bottom on page load.
	// This counteracts that.
	document.getElementById('pendingList')!.scrollTop = 0;
});
