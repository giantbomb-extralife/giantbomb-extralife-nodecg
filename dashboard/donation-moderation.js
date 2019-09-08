const donationsRep = nodecg.Replicant('donations');
donationsRep.on('change', (newVal) => {
    if (!newVal) {
        return;
    }
    document.getElementById('rejectedCount').textContent = `- ${newVal.rejected.length}`;
    document.getElementById('pendingCount').textContent = `- ${newVal.pending.length}`;
    document.getElementById('approvedCount').textContent = `- ${newVal.approved.length}`;
});
window.addEventListener('load', () => {
    // For some reason, this list gets scrolled to the bottom on page load.
    // This counteracts that.
    document.getElementById('pendingList').scrollTop = 0;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRpb24tbW9kZXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbmF0aW9uLW1vZGVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUM5RCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQWlCLEVBQUUsRUFBRTtJQUMvQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1osT0FBTztLQUNQO0lBRUQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RGLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFFLENBQUMsV0FBVyxHQUFHLEtBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwRixRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkYsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNwQyx1RUFBdUU7SUFDdkUseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyJ9