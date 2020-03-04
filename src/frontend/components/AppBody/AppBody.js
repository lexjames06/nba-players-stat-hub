import React, { useState, useEffect } from 'react';
import '../../../App.css'

export default function AppBody() {
    const [player, setPlayer] = useState('');
    const [playerSearching, setPlayerSearching] = useState('');
    const [playerSearched, setPlayerSearched] = useState('');
    const [searchStatus, setSearchStatus] = useState(false)

    document.title = 'NBA Draft Details'

    function updateSearchedPlayer(e) {
        setPlayerSearching(e.target.value);
    }

    function loading() {
        setSearchStatus('...loading');
        setPlayerSearched(playerSearching);
    }

    useEffect(() => {
        async function findPlayer() {
        const response = await fetch('http://data.nba.net/10s/prod/v1/2019/players.json');
        const data = await response.json();
        const nbaPlayer = data.league.standard
            .find(player => {
            let playerName = `${player.firstName} ${player.lastName}`;
            return playerName.toLowerCase() === playerSearched.toLowerCase();
            });
        if(nbaPlayer) {
            setPlayer(nbaPlayer);
            setSearchStatus(false);
            document.title = `${player.firstName} ${player.lastName} Draft Details`;
        } else if (playerSearched) {
            setSearchStatus('No player found');
        } else {
            setSearchStatus(false);
        }
        }
        searchStatus && findPlayer();
    });
  
  return (
    <div className='App'>
      <h3>Search NBA Player Draft Details</h3>
      <div>
        <input type='text' onChange={e => updateSearchedPlayer(e)}/>
        <button type='submit' onClick={() => loading()}>Find</button>
      </div>
      {
        searchStatus ? <div>{searchStatus}</div> : player &&
            (
              <div>
                <h4>{`${player.firstName} ${player.lastName}`}</h4>
                <div>Draft year: {player.draft.seasonYear || player.teams[0].seasonStart}</div>
                <div>Draft Position: {player.draft.pickNum || 'Undrafted'}</div>
              </div>
            )
      }
    </div>
  );
}