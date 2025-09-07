import { Container, Spinner } from "react-bootstrap";
import { usePlayer } from "../PlayerContext";
import { useState, useMemo, Suspense, lazy } from "react";
import axios from "axios";
import lastPage from '../assets/last_page.png';
import firstPage from '../assets/first_page.png';
import prevPage from "../assets/chevron_left.png";
import nextPage from "../assets/chevron_right.png";
import {
  getMinMax,
  getPlayers,
  getArrangedPlayers,
} from "../helpers/playersHelper";

const PlayerCard = lazy(() => import("../components/PlayerCard"));

const Players = () => {
  const { players, events, elementTypes, teams } = usePlayer();
   console.log(`Types: ${elementTypes}`)
console.log(`Teams:${teams}`)
  const [sort, setSort] = useState("total_points");
  const [view, setView] = useState("allPlayers");
  const [word, setWord] = useState("");
  const [cutPrice, setCutPrice] = useState(25);
  const [curPage, setCurPage] = useState(1);
  const pageSize = 20;

  const allPlayers = useMemo(() => getPlayers(players, sort, view, word, cutPrice).returnedPlayers, [players, sort, view, word, cutPrice]);
  const arranged = useMemo(() => getArrangedPlayers(allPlayers, curPage, pageSize), [allPlayers, curPage]);
  const pricesData = useMemo(() => getMinMax(players), [players]);
  const minMaxPrices = useMemo(() => getMinMax(allPlayers), [allPlayers]);

  const totalPages = Math.ceil(allPlayers.length / pageSize);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setCurPage(1);
  };

  const handlePageChange = (action) => {
    if (action === "first") setCurPage(1);
    else if (action === "last") setCurPage(totalPages);
    else if (action === "next" && curPage < totalPages) setCurPage(curPage + 1);
    else if (action === "prev" && curPage > 1) setCurPage(curPage - 1);
  };

  const renderPlayers = (group, title) => (
    group.length > 0 && (
      <div className='table-one' id={title?.toLowerCase()}>
        <div className='player-header-1'>
          <div className='info'></div>
          <div className='position-table-1'>{title}</div>
          <div className='money'>£</div>
          <div className='others'>Points</div>
        </div>
        <div>
          {group?.map((player) => {
            const teamObj = teams?.find(x => x?.id === player?.team);
            const posObj = elementTypes?.find(x => x?.id === player?.element_type);
            const news = player?.chance_of_playing_next_round;
            const forwardImage = posObj?.id === 1 ? `${teamObj?.code}_1-66` : `${teamObj?.code}-66`;
            const backgroundColor = news === 0 ? 'darkred' : news === 25 ? 'darkorange' : news === 50 ? 'orange' : news === 75 ? 'yellow' : 'white';
            const color = [0, 25, 50].includes(news) ? 'white' : 'black';

            return (
              <PlayerCard
                key={player?.id}
                backgroundColor={backgroundColor}
                color={color}
                forwardImage={forwardImage}
                playerPos={player}
                shortName={teamObj?.short_name}
                shortPos={posObj?.singular_name_short}
                position={posObj?.id}
                team={teamObj?.id}
                sort={sort}
              />
            );
          })}
        </div>
      </div>
    )
  );

  return (
    <div className="players-col">
      <div className="players small">
        <div className="players-container">
          <div className="players-heading-container">
            <h4 className="players-heading">Player Selection</h4>
          </div>
          <div className="plan-form">
            <form>
              <div className="view">
                <label htmlFor='view_by'>View</label>
                <select onChange={handleChange(setView)} className="custom-select" id="view_by">
                  <optgroup label="Global">
                    <option value="allPlayers">All Players</option>
                  </optgroup>
                  <optgroup label='By Position'>
                    {elementTypes.map((pPos) => (
                      <option key={pPos.id} value={`position_${pPos.id}`}>{pPos.singular_name}s</option>
                    ))}
                  </optgroup>
                  <optgroup label='By Team'>
                    {teams.map((team) => (
                      <option key={team.id} value={`team_${team.id}`}>{team.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className="sort">
                <label htmlFor='sort_by'>Sorted by</label>
                <select onChange={handleChange(setSort)} className="custom-select" id="sort_by">
                  <option value="total_points">Total points</option>
                  <option value="event_points">Round points</option>
                  <option value="now_cost">Price</option>
                </select>
              </div>
              <div className="search">
                <label htmlFor='search'>Search</label>
                <input onChange={handleChange(setWord)} id="search" className="blur" type="text" />
              </div>
              <div className="cost">
                <label htmlFor='cost_by'>Max cost</label>
                <div>Between <span>{minMaxPrices.minPrice.toFixed(1)}</span> and <span>{minMaxPrices.maxPrice.toFixed(1)}</span></div>
                <select onChange={handleChange(setCutPrice)} className="custom-select" id="cost_by">
                  {pricesData.prices.map((price, idx) => (
                    <option key={idx} value={price}>{price}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        {players.length ? (
          <div className="player-info">
            <div className="player-numbers">
              <span className="number">{players.length}</span>
              <span className="numbers">{players.length === 1 ? 'Player' : 'Players'}</span>
            </div>
            <div className="players-table">
              {renderPlayers(arranged.goalkeepers, "Goalkeepers")}
              {renderPlayers(arranged.defenders, "Defenders")}
              {renderPlayers(arranged.midfielders, "Midfielders")}
              {renderPlayers(arranged.forwards, "Forwards")}
              {renderPlayers(arranged.managers, "Managers")}
            </div>
            <div className="button-controls">
              <button disabled={curPage === 1} onClick={() => handlePageChange("first")} className="btn-controls-1">
                <img src={firstPage} alt="first_page" />
              </button>
              <button disabled={curPage === 1} onClick={() => handlePageChange("prev")} className="btn-controls-1">
                <img src={prevPage} alt="prev_page" />
              </button>
              <div className="pages">
                <span className="current">{curPage}</span>
                <span>of</span>
                <span className="total_pages">{totalPages}</span>
              </div>
              <button disabled={curPage === totalPages} onClick={() => handlePageChange("next")} className="btn-controls-1">
                <img src={nextPage} alt="next_page" />
              </button>
              <button disabled={curPage === totalPages} onClick={() => handlePageChange("last")} className="btn-controls-1">
                <img src={lastPage} alt="last_page" />
              </button>
            </div>
          </div>
        ) : <div className='no-trans small'>No Players Found</div>}
      </Suspense>
    </div>
  );
};

export default Players;
