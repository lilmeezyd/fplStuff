import { Container, Spinner } from "react-bootstrap";
import { usePlayer } from "../PlayerContext";
import { useState, useEffect, useMemo, Suspense } from "react";
import PlayerCard from "../components/PlayerCard";
import axios from "axios";
import lastPage from '../assets/last_page.png'
import firstPage from '../assets/first_page.png'
import prevPage from "../assets/chevron_left.png"
import nextPage from "../assets/chevron_right.png"
import {
  getMinMax,
  getPlayers,
  getArrangedPlayers,
} from "../helpers/playersHelper";

const Players = () => {
  const { players, events, elementTypes, teams } = usePlayer();
  const [sort, setSort] = useState("total_points");
  const [view, setView] = useState("allPlayers");
  const [word, setWord] = useState("");
  const [cutPrice, setCutPrice] = useState(25);
  const [curPage, setCurPage] = useState(1);
  const pageSize = 20;
  const allPlayers = getPlayers(
    players,
    sort,
    view,
    word,
    cutPrice
  ).returnedPlayers;
  const goalkeepers = getArrangedPlayers(
    allPlayers,
    curPage,
    pageSize
  ).goalkeepers;
  const defenders = getArrangedPlayers(allPlayers, curPage, pageSize).defenders;
  const midfielders = getArrangedPlayers(
    allPlayers,
    curPage,
    pageSize
  ).midfielders;
  const forwards = getArrangedPlayers(allPlayers, curPage, pageSize).forwards;
  const prices = getMinMax(players).prices;
  const minPrice = getMinMax(allPlayers).minPrice;
  const maxPrice = getMinMax(allPlayers).maxPrice;
  let totalPages = Math.ceil(allPlayers.length / pageSize);
  
  const onPrice = (e) => {
    setCutPrice(+e.target.value)
    setCurPage(1)
}

const onSearch = (e) => {
    setWord(e.target.value)
    setCurPage(1)
}

const onSort = (e) => {
    setSort(e.target.value)
    setCurPage(1)
}

const onView = (e) => {
    setView(e.target.value)
    setCurPage(1)
}

const viewNextPage = () => {
    setCurPage(curPage+1)
}
const viewPreviousPage = () => {
    setCurPage(curPage-1)
}

const viewFirstPage = () => {
    setCurPage(1)
}

const viewLastPage = () => {
    setCurPage(totalPages)
}



  return <div className="players-col">
  <div className="players small">
      <div className="players-container">
          <div className="players-heading-container">
              <h4 className="players-heading">Player Selection</h4>
          </div>
          <div className="plan-form">
              <form>
                  <div className="view">
                      <label htmlFor='view_by'>View</label>
                      <select onChange={onView} className="custom-select" id="view_by">
                          <optgroup label="Global">
                              <option value="allPlayers">All Players</option>
                          </optgroup>
                          <optgroup label='By Position'>
                              {elementTypes.map((pPos, idx) => {
                                  let positionId = 'position_'+pPos.id
                                  return(
                                      <option key={idx} value={positionId}>{pPos.singular_name}s</option>
                                  )
                              }
                               )}
                          </optgroup>
                          <optgroup label='By Team'>
                              {teams.map((team, idx)=> {
                                  let teamId = 'team_'+team.id
                                  return (
                                      <option key={idx} value={teamId}>{team.name}</option>)
                              }
                              )}
                          </optgroup>
                      </select>
                  </div>
                  <div className="sort">
                      <label htmlFor='sort_by'>Sorted by</label>
                      <select onChange={onSort} className="custom-select" id="sort_by">
                      <option value="total_points">Total points</option>
                      <option value="event_points">Round points</option>
                  <option value="now_cost">Price</option>
              </select>
          </div>
          <div className="search">
              <label htmlFor='search'>Search</label>
              <input onChange={onSearch} id="search" className="blur" type="text" name=""/>
          </div>
          <div className="cost">
              <label htmlFor='cost_by'>Max cost</label>
              <div>Between <span id="pMin">{minPrice.toFixed(1)}</span> and <span id="pMax">{maxPrice.toFixed(1)}</span></div>
              <select onChange={onPrice} className="custom-select" id="cost_by">
                  {prices.map((price, idx) => 
                          <option key={idx} value={price}>{price}</option>
                    )}
              </select>
          </div>
      </form>
  </div>
</div>
</div>
<Suspense fallback={<Spinner/>}>
{(players.length) ? 
<div className="player-info">
<div className="player-numbers">
  <span className="number">{players.length}</span>
  <span className="numbers">{players.length === 1 ? 'Player' : 'Players'}</span>
</div>
<div className="players-table">
  { goalkeepers.length > 0 ? (<div className='table-one' id='goalkeepers'>
      <div className='player-header-1'>
          <div className='info'></div>
          <div className='position-table-1'>Goalkeepers</div>
          <div className='money'>£</div>
          <div className='others'>Points</div>
      </div>
      <div>
          {goalkeepers.map((goalkeeper) => {
              let teamObj = teams.find(x => x.id === goalkeeper.team)
              let news = goalkeeper.chance_of_playing_next_round
              let short_name = teamObj?.short_name
              let positionObj = elementTypes.find(x => x.id === goalkeeper.element_type)
              let short_pos = positionObj.singular_name_short
              let forwardImage = positionObj.id === 1 ? `${teamObj.code}_1-66`:
            `${teamObj.code}-66`
              let backgroundColor = news === 0 ? 'darkred' : news === 25 ? 'darkorange' :
              news === 50 ? 'orange' : news === 75 ? 'yellow' : 'white'
              let color = news === 0 ? 'white' : news === 25 ? 'white' :
              news === 50 ? 'white' : 'black'    
              return (<PlayerCard 
                          key={goalkeeper.id}
                          backgroundColor={backgroundColor}
                          color={color}
                          forwardImage={forwardImage}
                          playerPos={goalkeeper}
                          shortName={short_name}
                          shortPos={short_pos}
                          position={positionObj.id}
                          team={teamObj.id}
                          sort={sort}></PlayerCard>)
          })}
      </div>
  </div>): ''}
  { defenders.length > 0 ? (<div className='table-one' id='defenders'>
  <div className='player-header-1'>
          <div className='info'></div>
          <div className='position-table-1'>Defenders</div>
          <div className='money'>£</div>
          <div className='others'>Points</div>
      </div>
      <div>
          {defenders.map((defender) => {
              let teamObj = teams.find(x => x.id === defender.team)
              let news = defender.chance_of_playing_next_round
              let short_name = teamObj?.short_name
              let positionObj = elementTypes.find(x => x.id === defender.element_type)
              let short_pos = positionObj.singular_name_short
              let forwardImage = positionObj.id === 1 ? `${teamObj.code}_1-66`:
            `${teamObj.code}-66`
                  let backgroundColor = news === 0 ? 'darkred' : news === 25 ? 'darkorange' :
                  news === 50 ? 'orange' : news === 75 ? 'yellow' : 'white'
                  let color = news === 0 ? 'white' : news === 25 ? 'white' :
                  news === 50 ? 'white' : 'black'    
                  return (<PlayerCard 
                      key={defender.id}
                      backgroundColor={backgroundColor}
                      color={color}
                      forwardImage={forwardImage}
                      playerPos={defender}
                      shortName={short_name}
                      shortPos={short_pos}
                      position={positionObj.id}
                      team={teamObj.id}
                      sort={sort}></PlayerCard>)
          })}
      </div>
  </div>): ''}
  { midfielders.length > 0 ? (<div className='table-one' id='midfielders'>
  <div className='player-header-1'>
          <div className='info'></div>
          <div className='position-table-1'>Midfielders</div>
          <div className='money'>£</div>
          <div className='others'>Points</div>
      </div>
      <div>
          {midfielders.map((midfielder) => {
              let teamObj = teams.find(x => x.id === midfielder.team)
              let news = midfielder.chance_of_playing_next_round
              let short_name = teamObj?.short_name
              let positionObj = elementTypes.find(x => x.id === midfielder.element_type)
              let short_pos = positionObj.singular_name_short
              let forwardImage = positionObj.id === 1 ? `${teamObj.code}_1-66`:
            `${teamObj.code}-66`
                  let backgroundColor = news === 0 ? 'darkred' : news === 25 ? 'darkorange' :
                  news === 50 ? 'orange' : news === 75 ? 'yellow' : 'white'
                  let color = news === 0 ? 'white' : news === 25 ? 'white' :
                  news === 50 ? 'white' : 'black'    
                  return (<PlayerCard 
                      key={midfielder.id}
                      backgroundColor={backgroundColor}
                      color={color}
                      forwardImage={forwardImage}
                      playerPos={midfielder}
                      shortName={short_name}
                      shortPos={short_pos}
                      position={positionObj.id}
                      team={teamObj.id}
                      sort={sort}></PlayerCard>)
          })}
      </div>
  </div>): ''}
  { forwards.length > 0 ? (<div className='table-one' id='forwards'>
  <div className='player-header-1'>
          <div className='info'></div>
          <div className='position-table-1'>Forwards</div>
          <div className='money'>£</div>
          <div className='others'>Points</div>
      </div>
      <div>
          {forwards.map((forward) => {
              let teamObj = teams.find(x => x.id === forward.team)
              let news = forward.chance_of_playing_next_round
              let short_name = teamObj?.short_name
              let positionObj = elementTypes.find(x => x.id === forward.element_type)
              let short_pos = positionObj.singular_name_short
              let forwardImage = positionObj.id === 1 ? `${teamObj.code}_1-66`:
            `${teamObj.code}-66`
                  let backgroundColor = news === 0 ? 'darkred' : news === 25 ? 'darkorange' :
                  news === 50 ? 'orange' : news === 75 ? 'yellow' : 'white'
                  let color = news === 0 ? 'white' : news === 25 ? 'white' :
                  news === 50 ? 'white' : 'black'    
                  return (<PlayerCard 
                      key={forward.id}
                      backgroundColor={backgroundColor}
                      color={color}
                      forwardImage={forwardImage}
                      playerPos={forward}
                      shortName={short_name}
                      shortPos={short_pos}
                      position={positionObj.id}
                      team={teamObj.id}
                      sort={sort}></PlayerCard>)
          })}
      </div>
  </div>): ''}
</div>
<div className="button-controls">
  <button disabled={curPage === 1 ? true : false}  onClick={viewFirstPage} className="btn-controls-1" id="firstPage">
      <img src={firstPage} alt="first_page"/>
  </button>
  <button disabled={curPage === 1 ? true : false} onClick={viewPreviousPage} className="btn-controls-1" id="prevButton">
      <img src={prevPage} alt="prev_page"/>
  </button>
  <div className="pages">
      <span className="current">{curPage}</span>
      <span>of</span>
      <span className="total_pages">{totalPages}</span>
  </div>
  <button disabled={curPage === totalPages ? true : false} onClick={viewNextPage} className="btn-controls-1" id="nextButton">
      <img src={nextPage} alt="next_page"/>
  </button> 
  <button disabled={curPage === totalPages ? true : false} onClick={viewLastPage} className="btn-controls-1" id="lastPage">
      <img src={lastPage} alt="last_page"/>
  </button>
</div>
</div> : <div className='no-trans small'>No Players Found</div>}
</Suspense>
</div>
};

export default Players;
