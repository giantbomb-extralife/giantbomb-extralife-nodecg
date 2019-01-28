'use strict';
const extraLifeIdRep = nodecg.Replicant('extralife-id');
const extraLifeTeamIdRep = nodecg.Replicant('extralife-team-id');
const extraLifeIdInput = document.getElementById('extralife_id');
const extraLifeTeamIdInput = document.getElementById('extralife_team_id');
extraLifeIdRep.on('change', (newValue) => {
    extraLifeIdInput.value = String(newValue);
});
extraLifeTeamIdRep.on('change', (newValue) => {
    extraLifeTeamIdInput.value = String(newValue);
});
document.getElementById('update').addEventListener('click', () => {
    extraLifeIdRep.value = extraLifeIdInput.value;
    extraLifeTeamIdRep.value = extraLifeTeamIdInput.value;
    document.getElementById('info-success').auto();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmEtbGlmZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYS1saWZlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFPYixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsbUJBQW1CLENBQUMsQ0FBQztBQUVsRixNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFxQixDQUFDO0FBQ3JGLE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBcUIsQ0FBQztBQUU5RixjQUFjLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQXFCLEVBQUUsRUFBRTtJQUNyRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWtCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQXlCLEVBQUUsRUFBRTtJQUM3RCxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDO0FBRUYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXVCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN2RixjQUFjLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUM5QyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO0lBQ3JELFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUMifQ==