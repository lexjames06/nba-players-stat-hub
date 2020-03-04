import React, { useState, useEffect } from 'react';
import './stats.css';

export default function Stats() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('NameDown');

    useEffect(() => {
        console.log('useEffect');
        getPlayers();
        getTeams();
        getDraftDetails();
        async function getPlayers() {
            const statsURL = 'http://localhost:3001/stats/players';
            fetch(statsURL)
                .then(response => response.json())
                .then(data => setPlayers(data.api.players));
        }
        async function getTeams() {
            const statsURL = 'http://localhost:3001/stats/teams';
            fetch(statsURL)
                .then(response => response.json())
                .then(data => setTeams(data.api.teams));
        }
        async function getDraftDetails() {
            const statsURL = 'http://localhost:3001/stats/draft';
            fetch(statsURL)
                .then(response => response.json())
                .then(data => setPlayerDetails(data.league.standard.filter(player => player.isActive)));
        }
    }, [])

    function getTeamName(firstName, lastName) {
        const playerName = `${firstName} ${lastName}`;
        const teamIdToMatch = players.find(player => `${player.firstName} ${player.lastName}` === playerName)?.teamId;
        return teams.find(team => team.teamId === teamIdToMatch)?.shortName;
    }

    function sortPlayers(playerA, playerB) {
        if(sortCriteria.includes('Team')) {
            const playerATeamName = getTeamName(playerA.firstName, playerA.lastName) === 'RMD' ?
                'DAL' :
                getTeamName(playerA.firstName, playerA.lastName);
            const playerBTeamName = getTeamName(playerB.firstName, playerB.lastName) === 'RMD' ?
                'DAL' :
                getTeamName(playerB.firstName, playerB.lastName);;
            if(sortCriteria === 'TeamDown') {
                return (playerATeamName < playerBTeamName ? -1 : 1)
            } else {
                return (playerATeamName > playerBTeamName ? -1 : 1)
            }
        } else if(sortCriteria.includes('Name')) {
            if(sortCriteria === 'NameDown') {
                return (playerA.lastName < playerB.lastName ? -1 : 1)
            } else {
                return (playerA.lastName > playerB.lastName ? -1 : 1)
            }
        } else if(sortCriteria.includes('DraftPosition')) {
            if(sortCriteria === 'DraftPositionDown') {
                return +(playerA.draft.pickNum) - +(playerB.draft.pickNum);
            } else {
                return +(playerB.draft.pickNum) - +(playerA.draft.pickNum)
            }
        } else if(sortCriteria.includes('Position')) {
            if(sortCriteria === 'PositionDown') {
                return (playerA.pos < playerB.pos ? -1 : 1)
            } else {
                return (playerA.pos > playerB.pos ? -1 : 1)
            }
        } else {
            if(sortCriteria === 'DraftYearDown') {
                return +playerA.draft.seasonYear - +playerB.draft.seasonYear
            } else {
                return +playerB.draft.seasonYear - +playerA.draft.seasonYear
            }
        }
    }

    return (
        <div className='table-container'>
            <h1>Player Profiles</h1>
            <div className='table'>
                <div className='table-row'>
                    <div onClick={() => setSortCriteria(sortCriteria === 'TeamDown' ? 'TeamUp' : 'TeamDown')}>Team</div>
                    <div onClick={() => setSortCriteria(sortCriteria === 'NameDown' ? 'NameUp' : 'NameDown')}>Name</div>
                    <div onClick={() => setSortCriteria(sortCriteria === 'PositionDown' ? 'PositionUp' : 'PositionDown')}>Position</div>
                    <div onClick={() => setSortCriteria(sortCriteria === 'DraftYearDown' ? 'DraftYearUp' : 'DraftYearDown')}>Draft Year</div>
                    <div onClick={() => setSortCriteria(sortCriteria === 'DraftPositionDown' ? 'DraftPositionUp' : 'DraftPositionDown')}>Draft Position</div>
                </div>
                {
                    playerDetails
                        .sort((playerA, playerB) => sortPlayers(playerA, playerB))
                        .map(({ personId, firstName, lastName, pos, draft: { pickNum, seasonYear} }) => {
                        const teamName = getTeamName(firstName, lastName);

                        return (
                                <tr key={personId} id={teamName} className='table-row'>
                                    <div>{teamName === 'RMD' ? 'DAL' : teamName}</div>
                                    <div>{firstName} {lastName}</div>
                                    <div>{pos}</div>
                                    <div>{seasonYear || 'Undrafted'}</div>
                                    <div>{pickNum || 'Undrafted'}</div>
                                </tr>
                            );
                        })
                }
            </div>
        </div>
    );
}