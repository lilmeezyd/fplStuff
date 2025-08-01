import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { PlayerContext } from "./PlayerContext";

export const ManagerContext = createContext({
  players: [],
  managerInfo: [],
  managerHistory: [],
  managerPicks: [],
  transferHistory: [],
  picks: [],
  real: [],
  chips: {},
  initialChips: {},
  transferLogic: {},
  playersOut: [],
  playersIn: [],
  outplayer: {},
  inplayerOne: {},
  inplayerTwo: {},
  tempPlayersOut: [],
  managerId: 0,
  eventId: 0,
  pickIndex: 1,
  playerName: "",
  remainingBudget: null,
  nowEvent: 0,
  updateNowEvent: () => { },
  updateInitsWc: () => { },
  updateInitsTc: () => { },
  updateInitsFh: () => { },
  updateInitsBb: () => { },
  updateInitsAm: () => { },
  getManagerInfo: () => { },
  updateWildcard: () => { },
  updateAm: () => { },
  addToTransfersOut: () => { },
  addToTransfersIn: () => { },
  getPickIndex: () => { },
  changeCaptain: () => { },
  changeViceCaptain: () => { },
  getOutPlayer: () => { },
  getInPlayerOne: () => { },
  getInPlayerTwo: () => { },
  cancelPlayer: () => { },
  getInTheBank: () => { },
  switchPlayers: () => { },
  changeBenchOrder: () => { },
  playersSelected: () => { },
  goalkeepersSelected: () => { },
  defendersSelected: () => { },
  midfieldersSelected: () => { },
  forwardsSelected: () => { },
  managersSelected: () => { },
  addedPlayer: () => { },
  transferCost: () => { },
  freeTransfers: () => { },
  updateFreehit: () => { },
  updateBboost: () => { },
  updateTcap: () => { },
  actDeact: () => { },
  colorOfArrow: () => { },
  resetGws: () => { },
});

function ManagerProvider({ children }) {
  const [managerId, setManagerId] = useState(
    localStorage.getItem("managerId") === null
      ? 0
      : +localStorage.getItem("managerId")
  );
  const [managerInfo, setManagerInfo] = useState([]);
  const [managerHistory, setManagerHistory] = useState([]);
  const [managerPicks, setManagerPicks] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [players, setPlayers] = useState([]);
  const [nowEvent, setNowEvent] = useState(0)
  const [chips, setChips] = useState({
    am: { used: false, event: null },
    wildcard: { used: false, event: null },
    bboost: { used: false, event: null },
    freehit: { used: false, event: null },
    tcap: { used: false, event: null },
  });
  const [initialChips, setInitialChips] = useState({ init_wc: null, init_tc: null, init_bb: null, init_fh: null, init_am: null })

  const [transferLogic, setTransferLogic] = useState({
    rolledFt: false,
    tc: 0,
    fts: 1,
  });
  const [picks, setPicks] = useState([]);
  const [real, setReal] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [playersOut, setPlayersOut] = useState([]);
  const [playersIn, setPlayersIn] = useState([]);
  const [tempPlayersOut, setTempPlayersOut] = useState([]);
  const [outplayer, setOutPlayer] = useState({});
  const [inplayerOne, setInPlayerOne] = useState({});
  const [inplayerTwo, setInPlayerTwo] = useState({});
  const [pickIndex, setPickIndex] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [first, setFirst] = useState(true)
  const { am } = chips

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getPlayers`)
        const data = await response.data
        setPlayers(data)
      } catch (error) {
        let errorMsg = error?.response?.data?.msg || error?.message
        console.log(errorMsg)
      }
    }
    fetchPlayers()
    const fetchManagerInfo = async () => {
      const url = `https://fpl-stuff-proxy.vercel.app/${managerId}/`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setManagerInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchManagerHistory = async () => {
      const url = `https://fpl-stuff-proxy.vercel.app/history/${managerId}/`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setManagerHistory(data);
        const { current, chips } = data
        let wildcardLength = data.chips.filter(
          (x) => x.name === "wildcard"
        ).length;
        let wildcard =
          data.chips.some((x) => x.name === "wildcard") && wildcardLength === 2
            ? true
            : wildcardLength === 1 &&
              data.chips.filter((x) => x.name === "wildcard")[0].time >
              new Date("2024/12/29/16:00").toISOString()
              ? true
              : false;

        let bboost = data.chips.some((x) => x.name === "bboost") ? true : false;
        let freehit = data.chips.some((x) => x.name === "freehit")
          ? true
          : false;
        let tcap = data.chips.some((x) => x.name === "3xc") ? true : false;
        let am = data.chips.some(x => x.name === 'manager') ? true : false

        let wEvent =
          wildcardLength === 2
            ? data.chips.filter((x) => x.name === "wildcard")[1].event
            : wildcardLength === 1 &&
              data.chips.filter((x) => x.name === "wildcard")[0].time >
              new Date("2024/12/29/16:00").toISOString()
              ? data.chips.filter((x) => x.name === "wildcard")[0].event
              : null;

        let amEvent = am === true ? data.chips.filter(x => x.name === "manager")[0].event : null
        let bEvent =
          bboost === true
            ? data.chips.filter((x) => x.name === "bboost")[0].event
            : null;
        let fEvent =
          freehit === true
            ? data.chips.filter((x) => x.name === "freehit")[0].event
            : null;
        let tEvent =
          tcap === true
            ? data.chips.filter((x) => x.name === "3xc")[0].event
            : null;

        setChips(prev => ({
          ...prev,
          am: { used: am, event: amEvent },
          wildcard: { used: wildcard, event: wEvent },
          bboost: { used: bboost, event: bEvent },
          freehit: { used: freehit, event: fEvent },
          tcap: { used: tcap, event: tEvent },
        }));

        setInitialChips({
          init_bb: bEvent, init_fh: fEvent, init_tc: tEvent, init_wc: wEvent, init_am: amEvent
        })

        const realPicks = [];
        const gameweekPicks = [];
        const gameweekTransfersOut = [];
        const gameweekTransfersIn = [];
        const transferPlayers = [];
        const seasonPicks = [];
        let bank,
          value,
          seasonBudget = (100).toFixed(1);

        if (current.length === 0) {
          setFirst(true)
          for (let i = eventId + 1; i < 39; i++) {
            gameweekPicks.push({
              event: i,
              newPicks: seasonPicks,
              budget: seasonBudget,
              bank: (100).toFixed(1),
              value: (100).toFixed(1),
            });
            gameweekTransfersOut.push({ event: i, arr: [] });
            gameweekTransfersIn.push({ event: i, arr: [] });
          }
          setTransferLogic((prev) => ({
            ...prev, rolledFt: true,
            tc: 0,
            fts: 'unlimited'
          }))
          setPicks(gameweekPicks);
          setReal(realPicks);
          setPlayersOut(gameweekTransfersOut);
          setPlayersIn(gameweekTransfersIn);
          localStorage.removeItem("picks");
          localStorage.setItem("picks", JSON.stringify(gameweekPicks));
        } else {
          setFirst(false)
          const eventId = current[current.length - 1]?.event
          setEventId(eventId)
          setNowEvent(eventId + 1)
          const chipDay = chips?.filter(x => x.name === 'wildcard' || x.name === 'freehit').map(x => x.event)
          let free = 1
          /*More work */
          const tranzies = current.filter((x, idx) => idx > 0)
          if (tranzies.length > 0) {
            tranzies.forEach(x => {
              if (x.event_transfers === 0) {
                if (!chipDay.includes(x.event)) {
                  if (free === 5) {
                    free += 0
                  } else {
                    free += 1
                  }
                } else {
                  free += 0
                }
              }
              if (x.event_transfers >= 1) {
                if (free >= x.event_transfers) {
                  free -= x.event_transfers
                  free += 1
                } else {
                  free = 1
                }
              }
            })
            setTransferLogic((prev) => ({
              ...prev, fts: free
            }))
          } else {
            setTransferLogic((prev) => ({
              ...prev, rolledFt: true,
              tc: 0,
              fts: 1
            }))
          }

        }
        //localStorage.removeItem('chips')
        // localStorage.setItem('chips', JSON.stringify(chips))
      } catch (error) {
        console.log(error);
      }
    };
    managerId >= 1 && fetchManagerInfo();
    managerId >= 1 && fetchManagerHistory();
  }, [managerId, eventId]);

  useEffect(() => {
    const fetchManagerPicks = async () => {
      const realPicks = [];
      const gameweekPicks = [];
      const gameweekTransfersOut = [];
      const gameweekTransfersIn = [];
      const transferPlayers = [];
      const seasonPicks = [];
      let bank,
        value,
        seasonBudget = (100).toFixed(1);
      if (eventId === 0) {
        for (let i = eventId + 1; i < 39; i++) {
          gameweekPicks.push({
            event: i,
            newPicks: seasonPicks,
            budget: seasonBudget,
            bank: (100).toFixed(1),
            value: (100).toFixed(1),
          });
          gameweekTransfersOut.push({ event: i, arr: [] });
          gameweekTransfersIn.push({ event: i, arr: [] });
        }
        setPicks(gameweekPicks);
        setReal(realPicks);
        setPlayersOut(gameweekTransfersOut);
        setPlayersIn(gameweekTransfersIn);
        localStorage.removeItem("picks");
        localStorage.setItem("picks", JSON.stringify(gameweekPicks));
      } else {
        //Manager's first gw
        const url = `https://fpl-stuff-proxy.vercel.app/${managerId}/event/${eventId}/picks/`;
        const url1 = `https://fpl-stuff-proxy.vercel.app/transfers/${managerId}/`;
        const url2 = `https://fpl-stuff-proxy.vercel.app/history/${managerId}/`
        try {
          const response2 = await fetch(url2);
          const data2 = await response2.json();
          let am = data2.chips.some(x => x.name === 'manager') ? true : false
          let amEvent = am === true ? data2.chips.filter(x => x.name === "manager")[0].event : null
          try {
            const response1 = await fetch(url1);
            const data1 = await response1.json();
            setTransferHistory(data1);
            try {
              let data;
              const response = await fetch(url);
              const data2 = await response.json();
              if (data2.active_chip === "freehit") {
                //https://corsproxy.io/?https://fantasy.premierleague.com
                const response2 =
                  await //fetch(`http://localhost:5000/${managerId}/event/${eventId-1}/picks`)
                    fetch(
                      `https://fpl-stuff-proxy.vercel.app/${managerId}/event/${eventId - 1
                      }/picks/`
                    );
                //fetch(`https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${managerId}/event/${eventId-1}/picks/`)
                const data3 = await response2.json();
                data = data3;
              } else {
                data = data2;
              }
              /* 
              setTransferLogic((prev) => ({
              ...prev, rolledFt: true,
              tc: 0,
              fts: 'unlimited'
            }))*/
              //console.log(data)
              setManagerPicks(data);

              //let buyingPrice
              const newPicks = [];
              const newPicksHyp = [];
              const realPicksHyp = [];
              /*const gameweekPicks = []
                  const gameweekTransfersOut = []
                  const gameweekTransfersIn = []
          const transferPlayers = []
          let bank, value*/

              // Resetting Team to state before auto-subs
              if (data.automatic_subs.length > 0) {
                data.picks.forEach((x) => {
                  let found = data.automatic_subs.some(
                    (player) => player.element_in === x.element
                  );
                  if (found) {
                    let autoIn = data.automatic_subs.find(
                      (player) => player.element_in === x.element
                    );
                    let autoOut = data.picks.find(
                      (player) => player.element === autoIn.element_out
                    );
                    let autoInMultiplier = x.multiplier;
                    let autoOutMultiplier = autoOut.multiplier;
                    let autoInPosition = x.position;
                    let autoOutPosition = autoOut.position;
                    x.multiplier = autoOutMultiplier;
                    x.position = autoOutPosition;
                    autoOut.position = autoInPosition;
                    autoOut.multiplier = autoInMultiplier;
                  }
                });
                //.map(y => y.position > 11 ? y.multiplier = 0 : y.multiplier)
              } else {
                data.picks.map((x) => x);
                //.map(y => y.position > 11 ? y.multiplier = 0 : y.multiplier)
              }

              data.picks.forEach((x) => {
                data1.forEach((y) => {
                  if (x.element === y.element_in) {
                    //Removing duplicate entries
                    let isFound = transferPlayers.some(
                      (player) => player.element === y.element_in
                    );
                    if (isFound) {
                      return;
                    } else {
                      transferPlayers.push({
                        element: y.element_in,
                        element_in_cost: y.element_in_cost,
                      });
                    }
                  }
                });
              });

              data.picks.forEach((x) => {
                players.forEach((y) => {
                  if (y.id === x.element) {
                    let now_cost = (y.now_cost / 10).toFixed(1);
                    let price_change = (y.cost_change_start / 10).toFixed(1);
                    newPicksHyp.push({
                      ...x,
                      disabled: true,
                      element_out: null,
                      element_type: y.element_type,
                      team: y.team,
                      now_cost,
                      price_change,
                    });
                    realPicksHyp.push({
                      ...x,
                      disabled: true,
                      element_out: null,
                      element_type: y.element_type,
                      team: y.team,
                      now_cost,
                      price_change,
                    });
                  }
                });
              });

              // Adding selling prices and buying prices to the picks
              newPicksHyp.forEach((x) => {
                let selling_price,
                  formattedCost,
                  profit,
                  actualProfit,
                  element_in_cost;
                let isFound = transferPlayers.some(
                  (player) => player.element === x.element
                );
                if (isFound) {
                  element_in_cost = transferPlayers.find(
                    (player) => player.element === x.element
                  ).element_in_cost;
                  formattedCost = (element_in_cost / 10).toFixed(1);
                  profit = +(+x.now_cost - +formattedCost).toFixed(1);
                  actualProfit = (profit * 10) % 2 === 0 ? "even" : "odd";
                  if (actualProfit === "even") {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+profit / 2).toFixed(1) + +formattedCost
                      ).toFixed(1);
                    }
                  } else {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+(profit / 2).toFixed(2).slice(0, 3)) + +formattedCost
                      ).toFixed(1);
                    }
                  }
                  newPicks.push({
                    ...x,
                    selling_price,
                    element_in_cost: formattedCost,
                  });
                } else {
                  formattedCost = (+x.now_cost - +x.price_change).toFixed(1);
                  profit = +(+x.now_cost - +formattedCost).toFixed(1);
                  actualProfit = (profit * 10) % 2 === 0 ? "even" : "odd";
                  //profit = ((+x.now_cost - +formattedCost)/2).toFixed(1)
                  if (actualProfit === "even") {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+profit / 2).toFixed(1) + +formattedCost
                      ).toFixed(1);
                    }
                  } else {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+(profit / 2).toFixed(2).slice(0, 3)) + +formattedCost
                      ).toFixed(1);
                    }
                  }
                  newPicks.push({
                    ...x,
                    selling_price,
                    element_in_cost: formattedCost,
                  });
                }
              });

              /* Adding selling prices and buying prices to picks to be used on reset for
               the first gw in the ui */
              realPicksHyp.forEach((x) => {
                let selling_price,
                  formattedCost,
                  profit,
                  actualProfit,
                  element_in_cost;
                let isFound = transferPlayers.some(
                  (player) => player.element === x.element
                );
                if (isFound) {
                  element_in_cost = transferPlayers.find(
                    (player) => player.element === x.element
                  ).element_in_cost;
                  formattedCost = (element_in_cost / 10).toFixed(1);
                  profit = +(+x.now_cost - +formattedCost).toFixed(1);
                  actualProfit = (profit * 10) % 2 === 0 ? "even" : "odd";
                  if (actualProfit === "even") {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+profit / 2).toFixed(1) + +formattedCost
                      ).toFixed(1);
                    }
                  } else {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+(profit / 2).toFixed(2).slice(0, 3)) + +formattedCost
                      ).toFixed(1);
                    }
                  }
                  realPicks.push({
                    ...x,
                    selling_price,
                    element_in_cost: formattedCost,
                  });
                } else {
                  formattedCost = (+x.now_cost - +x.price_change).toFixed(1);
                  profit = +(+x.now_cost - +formattedCost).toFixed(1);
                  actualProfit = (profit * 10) % 2 === 0 ? "even" : "odd";
                  //profit = ((+x.now_cost - +formattedCost)/2).toFixed(1)
                  if (actualProfit === "even") {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+profit / 2).toFixed(1) + +formattedCost
                      ).toFixed(1);
                    }
                  } else {
                    if (+profit < 0) {
                      selling_price = (
                        +(+profit.toFixed(2).slice(0, 4)) + +formattedCost
                      ).toFixed(1);
                    } else {
                      selling_price = (
                        +(+(profit / 2).toFixed(2).slice(0, 3)) + +formattedCost
                      ).toFixed(1);
                    }
                  }
                  realPicks.push({
                    ...x,
                    selling_price,
                    element_in_cost: formattedCost,
                  });
                }
              });

              bank = (data.entry_history.bank / 10).toFixed(1);
              value = (data.entry_history.value / 10).toFixed(1);
              let totalBudget = (
                newPicks.reduce((x, y) => x + +y.selling_price, 0) + +bank
              ).toFixed(1);

              for (let i = eventId + 1; i <= 39; i++) {
                if (amEvent === nowEvent - 1) {
                  const superNewz = newPicks?.filter(x => x.element_type !== 5)
                  const extraPrice = +newPicks?.find(x => x.element_type === 5)?.selling_price
                  const newBank = (+bank + (+extraPrice)).toFixed(1)
                  const superTotal = (superNewz.reduce((x, y) => x + +y.selling_price, 0) + +newBank).toFixed(1)
                  if (i <= eventId + 2) {
                    gameweekPicks.push({ event: i, newPicks, totalBudget, bank, value })
                  } else {
                    gameweekPicks.push({ event: i, newPicks: superNewz, totalBudget: superTotal, bank: newBank, value })
                  }
                }
                else if (amEvent === nowEvent - 2) {
                  const superNewz = newPicks?.filter(x => x.element_type !== 5)
                  const extraPrice = +newPicks?.find(x => x.element_type === 5)?.selling_price
                  const newBank = (+bank + (+extraPrice)).toFixed(1)
                  const superTotal = (superNewz.reduce((x, y) => x + +y.selling_price, 0) + +newBank).toFixed(1)
                  if (i <= eventId + 1) {
                    gameweekPicks.push({ event: i, newPicks, totalBudget, bank, value })
                  } else {
                    gameweekPicks.push({ event: i, newPicks: superNewz, totalBudget: superTotal, bank: newBank, value })
                  }
                } else if (amEvent === nowEvent - 3) {
                  const superNewz = newPicks?.filter(x => x.element_type !== 5)
                  const extraPrice = +newPicks?.find(x => x.element_type === 5)?.selling_price
                  const newBank = (+bank + (+extraPrice)).toFixed(1)
                  const superTotal = (superNewz.reduce((x, y) => x + +y.selling_price, 0) + +newBank).toFixed(1)
                  gameweekPicks.push({ event: i, newPicks: superNewz, totalBudget: superTotal, bank: newBank, value })
                }
                else {
                  gameweekPicks.push({
                    event: i,
                    newPicks,
                    totalBudget,
                    bank,
                    value,
                  });
                }

                gameweekTransfersOut.push({ event: i, arr: [] });
                gameweekTransfersIn.push({ event: i, arr: [] });
              }
              setPicks(gameweekPicks);
              setReal(realPicks);
              setPlayersOut(gameweekTransfersOut);
              setPlayersIn(gameweekTransfersIn);
              setRemainingBudget(bank);
              localStorage.removeItem("picks");
              localStorage.setItem("picks", JSON.stringify(gameweekPicks));
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error)
        }
      }
    };

    managerId >= 1 && fetchManagerPicks();
  }, [managerId, eventId, players]);

  const updateNowEvent = (num) => {
    setNowEvent(num)
  }

  const getManagerInfo = (id) => {
    setManagerId(id);
  };

  const getPickIndex = (id) => {
    setPickIndex(id);
    setPlayerName("");
  };

  const updateAm = (isUsed, eventPlayed, bb, tc, fh, wc) => {
    setChips({
      wildcard: { event: wc, used: wc >= eventId && typeof (wc) !== 'object' ? true : false },
      freehit: { event: fh, used: fh >= eventId && typeof (wc) !== 'object' ? true : false },
      tcap: { event: tc, used: tc >= eventId && typeof (wc) !== 'object' ? true : false },
      bboost: { used: bb >= eventId && typeof (wc) !== 'object' ? true : false, event: bb },
      am: { used: isUsed, event: eventPlayed },
    });
  }

  const updateWildcard = (isUsed, eventPlayed, bb, tc, fh, am) => {
    setChips({
      am: { event: am, used: am >= eventId ? true : false },
      freehit: { event: fh, used: fh >= eventId ? true : false },
      tcap: { event: tc, used: tc >= eventId ? true : false },
      bboost: { used: bb >= eventId ? true : false, event: bb },
      wildcard: { used: isUsed, event: eventPlayed },
    });
  };

  const updateFreehit = (isUsed, eventPlayed, tc, wc, bb, am) => {
    setChips({
      am: { event: am, used: am >= eventId ? true : false },
      freehit: { used: isUsed, event: eventPlayed },
      tcap: { event: tc, used: tc >= eventId ? true : false },
      wildcard: { event: wc, used: wc >= eventId ? true : false },
      bboost: { used: bb >= eventId ? true : false, event: bb },
    });
  };

  const resetGws = () => {
    // set playersIn and playersOut
    setPlayersIn((prev) =>
      prev.map((gw, idx) => (idx >= pickIndex - 1 ? { ...gw, arr: [] } : gw))
    );
    setPlayersOut((prev) =>
      prev.map((gw, idx) => (idx >= pickIndex - 1 ? { ...gw, arr: [] } : gw))
    );
    setTempPlayersOut([]);
    setOutPlayer({});
    setInPlayerOne({});
    // set picks for later weeks
    if(eventId === 0) {
      setPicks(prev => prev.map((pick, key) => key >= pickIndex - 1 ? { ...pick, newPicks: [] } : pick))
    } else {
      if(pickIndex === 1) {
        if(am?.event + 1 === nowEvent) {
          setPicks((prev) =>
            prev.map((pick, key) =>
              (key >= pickIndex - 1 && key <= pickIndex)
                ? { ...pick, newPicks: real }
                :  { ...pick, newPicks: prev[pickIndex - 1].newPicks.filter(x => x.element_type !== 5) }
            ),
          )
        } else if (am?.event + 2 === nowEvent) {
          setPicks((prev) =>
            prev.map((pick, key) =>
              (key === pickIndex - 1)
                ? { ...pick, newPicks: real }
                : { ...pick, newPicks: prev[pickIndex - 1].newPicks.filter(x => x.element_type !== 5) }
            ),
          )
        } else {
          setPicks((prev) =>
            prev.map((pick, key) =>
              key >= pickIndex - 1 ? { ...pick, newPicks: real } : pick
            )
          );
        }
      } else {
        if (
          chips.freehit.event === picks[pickIndex - 2].event &&
          pickIndex - 2 > 0
        ) {
          //console.log('gt 0')
          setPicks((prev) =>
            prev.map((pick, key) =>
              key >= pickIndex - 1
                ? { ...pick, newPicks: prev[pickIndex - 3].newPicks }
                : pick
            )
          );
        }
        else if (
          chips.freehit.event === picks[pickIndex - 2].event &&
          pickIndex - 2 === 0
        ) {
          setPicks((prev) =>
            prev.map((pick, key) =>
              key >= pickIndex - 1 ? { ...pick, newPicks: real } : pick
            )
          );
        } else if(am?.event + 1 === nowEvent) {
          setPicks((prev) =>
            picks.map((pick, key) =>
              (key >= pickIndex - 1 && key <= pickIndex)
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                : key > pickIndex ? { ...pick, newPicks: prev[pickIndex - 2].newPicks.filter(x => x.element_type !== 5) }
                  : pick
            ),
          )
        } else if (am?.event + 2 === nowEvent) {
          setPicks((prev) =>
            picks.map((pick, key) =>
              (key === pickIndex - 1)
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                : key >= pickIndex ? { ...pick, newPicks: prev[pickIndex - 2].newPicks.filter(x => x.element_type !== 5) }
                  : pick
            ),
          )
        } else {
          setPicks((prev) =>
            prev.map((pick, key) =>
              key >= pickIndex - 1
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks.filter(x => x.element_type !== 5) }
                : pick
            )
          );
        }
      }
    }
/*
    if (pickIndex === 1) {
      if (eventId === 0) {
        setPicks(prev => prev.map((pick, key) => key >= pickIndex - 1 ? { ...pick, newPicks: [] } : pick))
      }
      else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key >= pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      }

    } else {
      if (
        chips.freehit.event === picks[pickIndex - 2].event &&
        pickIndex - 2 > 0
      ) {
        //console.log('gt 0')
        setPicks((prev) =>
          prev.map((pick, key) =>
            key >= pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 3].newPicks }
              : pick
          )
        );
      } else if (
        chips.freehit.event === picks[pickIndex - 2].event &&
        pickIndex - 2 === 0
      ) {
        //console.log('lt 0')
        setPicks((prev) =>
          prev.map((pick, key) =>
            key >= pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      }
      else {
        if (am?.event + 1 === nowEvent) {
          console.log('boyt')
          setPicks((prev) =>
            picks.map((pick, key) =>
              (key >= pickIndex - 1 && key <= pickIndex)
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                : key > pickIndex ? { ...pick, newPicks: prev[pickIndex - 1].newPicks.filter(x => x.element_type !== 5) }
                  : pick
            ),
          )
        } else if (am?.event + 2 === nowEvent) {
          console.log('i am here')
          setPicks((prev) =>
            picks.map((pick, key) =>
              (key === pickIndex - 1)
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                : key >= pickIndex ? { ...pick, newPicks: prev[pickIndex - 1].newPicks.filter(x => x.element_type !== 5) }
                  : pick
            ),
          )
        } else {
          console.log('normal')
          setPicks((prev) =>
            prev.map((pick, key) =>
              key >= pickIndex - 1
                ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                : pick
            )
          );
        }


      }
    }*/
  };
  const actDeact = useCallback(() => {
    if (chips.freehit.event === +eventId + pickIndex) {
      setPlayersIn((prev) =>
        prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
      );
      setPlayersOut((prev) =>
        prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
      );
      if (pickIndex === 1) {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      } else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
              : pick
          )
        );
      }
    } else {
      setPicks((prev) =>
        prev.map((pick, key) =>
          key > pickIndex - 1
            ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
            : pick
        )
      );
      setPlayersIn((prev) =>
        prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
      );
      setPlayersOut((prev) =>
        prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
      );
    }
  }, [chips.freehit.event, eventId, pickIndex, real]);

  const updateBboost = (isUsed, eventPlayed, fh, tc, wc, am) => {
    setChips({
      am: { event: am, used: am >= eventId ? true : false },
      tcap: { event: tc, used: tc >= eventId ? true : false },
      freehit: { event: fh, used: fh >= eventId ? true : false },
      wildcard: { event: wc, used: wc >= eventId ? true : false },
      bboost: { used: isUsed, event: eventPlayed },
    });
  };

  const updateTcap = (isUsed, eventPlayed, fh, bb, wc, am) => {
    setChips({
      am: { event: am, used: am >= eventId ? true : false },
      freehit: { event: fh, used: fh >= eventId ? true : false },
      wildcard: { event: wc, used: wc >= eventId ? true : false },
      bboost: { used: bb >= eventId ? true : false, event: bb },
      tcap: { used: isUsed, event: eventPlayed },
    });
  };

  const updateInitsAm = (event) => {
    setInitialChips(prev => ({ ...prev, init_am: event }))
  }

  const updateInitsWc = (event) => {
    setInitialChips(prev => ({ ...prev, init_wc: event }))
  }
  const updateInitsFh = (event) => {
    setInitialChips(prev => ({ ...prev, init_fh: event }))
  }
  const updateInitsBb = (event) => {
    setInitialChips(prev => ({ ...prev, init_bb: event }))
  }
  const updateInitsTc = (event) => {
    setInitialChips(prev => ({ ...prev, init_tc: event }))
  }

  // transfer in
  const addToTransfersIn = (id, elementType, teamId) => {
    const player = {}
    //let price_change = (players.find(x => x.id === id).price_change/10).toFixed(1)
    let element_in_cost = (
      players?.find((x) => x.id === id).now_cost / 10
    ).toFixed(1);
    let selling_price = (
      players?.find((x) => x.id === id).now_cost / 10
    ).toFixed(1);

    player.element_type = elementType;
    player.element = id;
    player.team = teamId;
    player.disabled = true;
    player.position = 0;
    player.is_captain = false;
    player.is_vice_captain = false;
    player.multiplier = 1;
    //player.price_change = price_change
    player.element_in_cost = element_in_cost;
    player.selling_price = selling_price;
    if (elementType === 5) {
      player.position = 16
      if (am?.event === nowEvent) {
        setPicks([
          ...picks.map((pick, key) =>
            (key >= pickIndex - 1 && key <= pickIndex + 1)
              ? { ...pick, newPicks: [...pick.newPicks, player] }
              : pick
          ),
        ]);
      } else {
        let managerOut = tempPlayersOut.filter((x) => x.element_type === 5)[0]?.element;
        setPlayersIn((x) => [
          ...x.map((gw, idx) =>
            idx === pickIndex - 1 ? { ...gw, arr: [...gw.arr, player] } : gw
          ),
        ]);
        setPlayersOut((prev) =>
          prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
        );
        setTempPlayersOut((x) => [...x.filter((y) => y.element !== managerOut)]);
        if (am?.event + 1 === nowEvent) {
          setPicks([
            ...picks.map((pick, key) =>
              (key >= pickIndex - 1 && key <= pickIndex)
                ? { ...pick, newPicks: [...pick.newPicks.filter(x => x.element !== managerOut), player] }
                : pick
            ),
          ])
        }
        if (am?.event + 2 === nowEvent) {
          setPicks([
            ...picks.map((pick, key) =>
              (key === pickIndex - 1)
                ? { ...pick, newPicks: [...pick.newPicks.filter(x => x.element !== managerOut), player] }
                : pick
            ),
          ])
        }

      }
    } else {
      let playersOutG = tempPlayersOut.filter((x) => x.element_type === 1).length;
      let playersOutD = tempPlayersOut.filter((x) => x.element_type === 2).length;
      let playersOutM = tempPlayersOut.filter((x) => x.element_type === 3).length;
      let playersOutF = tempPlayersOut.filter((x) => x.element_type === 4).length;

      let goalkeepers =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 1).length -
        playersOutG;
      let defenders =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 2).length -
        playersOutD;
      let midfielders =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 3).length -
        playersOutM;
      let forwards =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 4).length -
        playersOutF;

      //let playersOutBenchG = tempPlayersOut.filter(x => x.multiplier === 0 && x.element_type === 1).length
      let playersOutnonB = tempPlayersOut.filter(
        (x) => x.multiplier !== 0
      ).length;
      let playersOutPG = tempPlayersOut.filter(
        (x) => x.multiplier !== 0 && x.element_type === 1
      ).length;
      let playersOutPD = tempPlayersOut.filter(
        (x) => x.multiplier !== 0 && x.element_type === 2
      ).length;
      let playersOutPM = tempPlayersOut.filter(
        (x) => x.multiplier !== 0 && x.element_type === 3
      ).length;
      let playersOutPF = tempPlayersOut.filter(
        (x) => x.multiplier !== 0 && x.element_type === 4
      ).length;

      //let benchGoalie = picks[pickIndex-1].newPicks.filter(x => x.multiplier === 0 && x.element_type === 1).length - playersOutBenchG
      let nonBench =
        picks[pickIndex - 1].newPicks.filter((x) => x.multiplier !== 0).length -
        playersOutnonB;
      let playingGoalie =
        picks[pickIndex - 1].newPicks.filter(
          (x) => x.multiplier !== 0 && x.element_type === 1
        ).length - playersOutPG;
      let playingDef =
        picks[pickIndex - 1].newPicks.filter(
          (x) => x.multiplier !== 0 && x.element_type === 2
        ).length - playersOutPD;
      let playingMid =
        picks[pickIndex - 1].newPicks.filter(
          (x) => x.multiplier !== 0 && x.element_type === 3
        ).length - playersOutPM;
      let playingFwd =
        picks[pickIndex - 1].newPicks.filter(
          (x) => x.multiplier !== 0 && x.element_type === 4
        ).length - playersOutPF;


      if (
        picks[pickIndex - 1]?.newPicks.length < 15 ||
        tempPlayersOut.length > 0
      ) {
        let orderOne = picks[pickIndex - 1].newPicks.some(
          (x) => x.position === 13
        );
        let orderTwo = picks[pickIndex - 1].newPicks.some(
          (x) => x.position === 14
        );
        let orderThree = picks[pickIndex - 1].newPicks.some(
          (x) => x.position === 15
        );

        if (elementType === 1 && playingGoalie === 1) {
          player.position = 12;
          player.multiplier = 0;
        } else {
          player.position = 1;
          player.multiplier = 1;
        }

        if (
          (elementType === 2 && nonBench === 11) ||
          (elementType === 2 &&
            nonBench === 9 &&
            playingDef === 4 &&
            playingMid === 5) ||
          (elementType === 2 && nonBench === 10 && playingGoalie === 0) ||
          (elementType === 2 && nonBench === 10 && playingFwd === 0)
        ) {
          player.multiplier = 0;
          player.position =
            !orderOne && !orderTwo && !orderThree
              ? 13
              : orderOne && !orderTwo && !orderThree
                ? 14
                : orderOne && orderTwo && !orderThree
                  ? 15
                  : !orderOne && orderTwo && orderThree
                    ? 13
                    : orderOne && !orderTwo && orderThree
                      ? 14
                      : 15;
        }

        if (
          (elementType === 3 && nonBench === 11) ||
          (elementType === 3 &&
            nonBench === 9 &&
            playingMid === 4 &&
            playingDef === 5) ||
          (elementType === 3 && nonBench === 10 && playingGoalie === 0) ||
          (elementType === 3 && nonBench === 10 && playingFwd === 0) ||
          (elementType === 3 && nonBench === 10 && playingDef === 2) ||
          (elementType === 3 && playingMid === 4 && playingFwd === 3)
        ) {
          player.multiplier = 0;
          player.position =
            !orderOne && !orderTwo && !orderThree
              ? 13
              : orderOne && !orderTwo && !orderThree
                ? 14
                : orderOne && orderTwo && !orderThree
                  ? 15
                  : !orderOne && orderTwo && orderThree
                    ? 13
                    : orderOne && !orderTwo && orderThree
                      ? 14
                      : 15;
        }

        if (
          (elementType === 4 && nonBench === 11) ||
          (elementType === 4 && nonBench === 10 && playingGoalie === 0) ||
          (elementType === 4 && nonBench === 10 && playingDef === 2) ||
          (elementType === 4 && playingMid === 5 && playingFwd === 2)
        ) {
          player.multiplier = 0;
          player.position =
            !orderOne && !orderTwo && !orderThree
              ? 13
              : orderOne && !orderTwo && !orderThree
                ? 14
                : orderOne && orderTwo && !orderThree
                  ? 15
                  : !orderOne && orderTwo && orderThree
                    ? 13
                    : orderOne && !orderTwo && orderThree
                      ? 14
                      : 15;
        }
        if (
          (elementType === 1 && goalkeepers < 2) ||
          (elementType === 2 && defenders < 5) ||
          (elementType === 3 && midfielders < 5) ||
          (elementType === 4 && forwards < 3)
        ) {
          let repeatedPlayer = [];
          //switching captaincy
          /*player.is_captain = playerOut.is_captain
                  player.is_vice_captain = playerOut.is_vice_captain
                  player.multiplier = playerOut.multiplier
                  player.element_out = playerOut.element
                  player.position = playerOut.position*/
          //x.setAttribute('disabled', true)
          for (let j = 0; j < playersOut[pickIndex - 1].arr.length; j++) {
            if (player.element === playersOut[pickIndex - 1].arr[j].element) {
              repeatedPlayer.push(...playersOut[pickIndex - 1].arr.splice(j, 1));
            }
          }
          if (repeatedPlayer.length === 1) {
            // player already transferred out
            playersIn.push();
            let likelyReplaced = tempPlayersOut.find(
              (x) => x.element_type === player.element_type
            );
            let isOut = picks[pickIndex - 1].newPicks.some(
              (x) => x.element_out === repeatedPlayer[0].element
            );
            if (isOut) {
              let withIsOut = picks[pickIndex - 1].newPicks.find(
                (x) => x.element_out === repeatedPlayer[0].element
              );
              withIsOut.element_out = likelyReplaced.element;
              let inIndex = playersIn[pickIndex - 1].arr.findIndex(
                (x) => x.element === withIsOut.element
              );
              setPlayersIn((x) => [
                ...x.map((gw, idx) =>
                  idx === pickIndex - 1
                    ? {
                      ...gw,
                      arr: [
                        ...gw.arr.filter((y, key) => key !== inIndex),
                        withIsOut,
                      ],
                    }
                    : gw
                ),
              ]);
              repeatedPlayer[0].is_captain = likelyReplaced.is_captain;
              repeatedPlayer[0].is_vice_captain = likelyReplaced.is_vice_captain;
              repeatedPlayer[0].position = likelyReplaced.position;
              repeatedPlayer[0].multiplier = likelyReplaced.multiplier;
              let repeatedIndex = picks[pickIndex - 1].newPicks.findIndex(
                (x) => x.element === likelyReplaced.element
              );
              setPicks([
                ...picks.map((pick, key) =>
                  key === pickIndex - 1
                    ? {
                      ...pick,
                      newPicks: pick.newPicks.map((newPick, idx) =>
                        idx === repeatedIndex ? repeatedPlayer[0] : newPick
                      ),
                    }
                    : pick
                ),
              ]);

              // set picks for later weeks
              if (chips.freehit.event === +eventId + pickIndex) {
                if (pickIndex === 1) {
                  setPicks((prev) =>
                    prev.map((pick, key) =>
                      key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
                    )
                  );
                } else {
                  setPicks((prev) =>
                    prev.map((pick, key) =>
                      key > pickIndex - 1
                        ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                        : pick
                    )
                  );
                }
              } else {
                setPicks((prev) =>
                  prev.map((pick, key) =>
                    key > pickIndex - 1
                      ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
                      : pick
                  )
                );
              }
            } else {
              setPicks([
                ...picks.map((pick, key) =>
                  key === pickIndex - 1
                    ? {
                      ...pick,
                      newPicks: pick.newPicks.map((newPick, idx) =>
                        newPick.element === repeatedPlayer[0].element
                          ? repeatedPlayer[0]
                          : newPick
                      ),
                    }
                    : pick
                ),
              ]);
              // set picks for later weeks
              if (chips.freehit.event === +eventId + pickIndex) {
                if (pickIndex === 1) {
                  setPicks((prev) =>
                    prev.map((pick, key) =>
                      key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
                    )
                  );
                } else {
                  setPicks((prev) =>
                    prev.map((pick, key) =>
                      key > pickIndex - 1
                        ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                        : pick
                    )
                  );
                }
              } else {
                setPicks((prev) =>
                  prev.map((pick, key) =>
                    key > pickIndex - 1
                      ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
                      : pick
                  )
                );
              }
            }
            let pIndex = tempPlayersOut.findIndex(
              (x) =>
                x.element_type === player.element_type &&
                x.element === likelyReplaced.element
            );

            setTempPlayersOut((x) => [...x.filter((y, idx) => idx !== pIndex)]);
          } else {
            // Normal player addition
            // set playersIn array
            if (eventId === 0 && picks[0]?.newPicks.length < 15) {
              let hasCap = picks[0].newPicks.some((x) => x.is_captain);
              let hasVC = picks[0].newPicks.some((x) => x.is_vice_captain);
              if (!hasCap && !hasVC && player.multiplier > 0) {
                player.is_captain = true;
                player.multiplier = 2;
              }
              if (hasCap && !hasVC && player.multiplier > 0) {
                player.is_vice_captain = true;
              }

              // set picks in current week
              setPicks([
                ...picks.map((pick, key) =>
                  key === pickIndex - 1
                    ? { ...pick, newPicks: [...pick.newPicks, player] }
                    : pick
                ),
              ]);
            } else {
              let playerOut = tempPlayersOut.find(
                (x) => x.element_type === player.element_type
              );
              let playerOutIndex = picks[pickIndex - 1]?.newPicks?.findIndex(
                (x) => x.element === playerOut.element
              );
              //switching captaincy
              player.is_captain = playerOut.is_captain;
              player.is_vice_captain = playerOut.is_vice_captain;
              player.multiplier = playerOut.multiplier;
              player.element_out = playerOut.element;
              player.position = playerOut.position;
              setPlayersIn((x) => [
                ...x.map((gw, idx) =>
                  idx === pickIndex - 1
                    ? { ...gw, arr: [...gw.arr, player] }
                    : idx > pickIndex - 1
                      ? { ...gw, arr: [] }
                      : gw
                ),
              ]);
              // set playersOut array
              setPlayersOut((x) => [
                ...x.map((gw, idx) =>
                  idx > pickIndex - 1 ? { ...gw, arr: [] } : gw
                ),
              ]);

              // set picks in current week
              setPicks([
                ...picks.map((pick, key) =>
                  key === pickIndex - 1
                    ? {
                      ...pick,
                      newPicks: pick?.newPicks?.map((newPick, idx) =>
                        idx === playerOutIndex ? player : newPick
                      ),
                    }
                    : pick
                ),
              ]);
              let pIndex = tempPlayersOut.findIndex(
                (x) => x.element_type === player.element_type
              );
              setTempPlayersOut((x) => [...x.filter((y, idx) => idx !== pIndex)]);
            }

            // set picks for later weeks
            if (chips.freehit.event === +eventId + pickIndex) {
              if (pickIndex === 1) {
                setPicks((prev) =>
                  prev.map((pick, key) =>
                    key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
                  )
                );
              } else {
                setPicks((prev) =>
                  prev.map((pick, key) =>
                    key > pickIndex - 1
                      ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                      : pick
                  )
                );
              }
            } else {
              setPicks((prev) =>
                prev.map((pick, key) =>
                  key > pickIndex - 1
                    ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
                    : pick
                )
              );
            }
          }
        }
      }
    }

  };

  // transfer out
  const addToTransfersOut = (player) => {
    //Add player to playersOut or remove player from playersOut
    //let totalBudget = +picks[pickIndex-1].totalBudget
    let totalBudget = +picks[pickIndex - 1].budget;
    let spent =
      picks[pickIndex - 1].newPicks.reduce((x, y) => x + +y.selling_price, 0) -
      playersOut.reduce((x, y) => x + +y.selling_price, 0);
    let isFoundOut = playersOut[pickIndex - 1].arr.some(
      (x) => x.element === player.element
    );
    let isFoundIn = playersIn[pickIndex - 1].arr.some(
      (x) => x.element === player.element
    );
    let sellingPrice = +picks[pickIndex - 1].newPicks.find(
      (x) => x.element === player.element
    ).selling_price;
    let remainder = (+totalBudget - spent).toFixed(1);
    if (player?.element_type === 5) {
      if (am?.event === nowEvent) {
        setPicks([
          ...picks.map((pick, key) =>
            (key >= pickIndex - 1 && key <= pickIndex + 1)
              ? { ...pick, newPicks: [...pick.newPicks.filter(x => x.element !== player.element)] }
              : pick
          ),
        ]);
      } else {
        if (isFoundIn) {
          //In PlayersIn Array
          let isFoundInIndex = playersIn[pickIndex - 1].arr.findIndex(
            (x) => x.element === player.element
          );
          let isFoundInPicksIndex = picks[pickIndex - 1].newPicks.findIndex(
            (x) => x.element === player.element
          );
          const replacedObj = playersOut[pickIndex - 1].arr.find(
            (x) => x.element_type === 5
          );

          let isCaptain =
            picks[pickIndex - 1].newPicks[isFoundInPicksIndex].is_captain;
          let isViceCaptain =
            picks[pickIndex - 1].newPicks[isFoundInPicksIndex].is_vice_captain;
          let multiplier =
            picks[pickIndex - 1].newPicks[isFoundInPicksIndex].multiplier;
          let position =
            picks[pickIndex - 1].newPicks[isFoundInPicksIndex].position;
          const replacedElementObj = {
            ...replacedObj,
            is_captain: isCaptain,
            is_vice_captain: isViceCaptain,
            multiplier: multiplier,
            position: position,
          };
          //In PlayersOut Array
          let isFoundOutIndex = playersOut.findIndex(
            (x) => x.element === player.element
          );
          setPlayersOut((x) => [
            ...x.map((gw, idx) =>
              idx === pickIndex - 1
                ? { ...gw, arr: gw.arr.filter((y) => y.element !== player.element) }
                : gw
            ),
          ]);
          setPlayersIn((x) => [
            ...x.map((gw, idx) =>
              idx === pickIndex - 1
                ? { ...gw, arr: gw.arr.filter((y) => y.element_type !== 5) }
                : gw
            ),
          ]);
          setPlayersIn((prev) =>
            prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
          );
          setPlayersOut((prev) =>
            prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
          );
          if (am?.event + 1 === nowEvent) {
            setPicks([
              ...picks.map((pick, key) =>
                (key >= pickIndex - 1 && key <= pickIndex)
                  ? {
                    ...pick, newPicks: [...pick.newPicks.filter((newPick) => newPick.element !== player.element
                    ), replacedElementObj]
                  }
                  : pick
              ),
            ])
          }
          if (am?.event + 2 === nowEvent) {
            setPicks([
              ...picks.map((pick, key) =>
                (key === pickIndex - 1)
                  ? {
                    ...pick, newPicks: [...pick.newPicks.filter((newPick) => newPick.element !== player.element
                    ), replacedElementObj]
                  }
                  : pick
              ),
            ])
          }

          setTempPlayersOut((x) => [...x, replacedElementObj]);
        }
        if (isFoundOut) {
          let isFoundOutIndex = playersOut[pickIndex - 1].arr.findIndex(
            (x) => x.element === player.element
          );
          let isFoundOutTempIndex = tempPlayersOut.findIndex(
            (x) => x.element === player.element
          );
          setPlayersOut((x) => [
            ...x.map((gw, idx) =>
              idx === pickIndex - 1
                ? { ...gw, arr: gw.arr.filter((y, key) => key !== isFoundOutIndex) }
                : gw
            ),
          ]);
          setTempPlayersOut((x) => [
            ...x.filter((y, idx) => idx !== isFoundOutTempIndex),
          ]);
          setRemainingBudget(+remainder - sellingPrice);
        } else {
          if (!isFoundIn) {
            if (
              eventId === 0 &&
              picks[0]?.newPicks.length <= 15 &&
              pickIndex === 1
            ) {
              setPicks([
                ...picks.map((pick, key) =>
                  key === 0
                    ? {
                      ...pick,
                      newPicks: pick.newPicks.filter(
                        (newPick, idx) => newPick.element !== player.element
                      ),
                    }
                    : pick
                ),
              ]);
              setRemainingBudget(+remainder - sellingPrice);
            } else {
              setPlayersOut((x) => [
                ...x.map((gw, idx) =>
                  idx === pickIndex - 1 ? { ...gw, arr: [...gw.arr, player] } : gw
                ),
              ]);
              setTempPlayersOut((x) => [...x, player]);
            }
          }
        }
      }
    } else {
      if (isFoundOut) {
        let isFoundOutIndex = playersOut[pickIndex - 1].arr.findIndex(
          (x) => x.element === player.element
        );
        let isFoundOutTempIndex = tempPlayersOut.findIndex(
          (x) => x.element === player.element
        );
        setPlayersOut((x) => [
          ...x.map((gw, idx) =>
            idx === pickIndex - 1
              ? { ...gw, arr: gw.arr.filter((y, key) => key !== isFoundOutIndex) }
              : gw
          ),
        ]);
        setTempPlayersOut((x) => [
          ...x.filter((y, idx) => idx !== isFoundOutTempIndex),
        ]);
        setRemainingBudget(+remainder - sellingPrice);
      } else {
        if (!isFoundIn) {
          if (
            eventId === 0 &&
            picks[0]?.newPicks.length <= 15 &&
            pickIndex === 1
          ) {
            setPicks([
              ...picks.map((pick, key) =>
                key === 0
                  ? {
                    ...pick,
                    newPicks: pick.newPicks.filter(
                      (newPick, idx) => newPick.element !== player.element
                    ),
                  }
                  : pick
              ),
            ]);
            setRemainingBudget(+remainder - sellingPrice);
          } else {
            setPlayersOut((x) => [
              ...x.map((gw, idx) =>
                idx === pickIndex - 1 ? { ...gw, arr: [...gw.arr, player] } : gw
              ),
            ]);
            setTempPlayersOut((x) => [...x, player]);
          }
        }
      }

      if (isFoundIn) {
        //In PlayersIn Array
        let isFoundInIndex = playersIn[pickIndex - 1].arr.findIndex(
          (x) => x.element === player.element
        );
        let isFoundInPicksIndex = picks[pickIndex - 1].newPicks.findIndex(
          (x) => x.element === player.element
        );
        let replacedElement =
          playersIn[pickIndex - 1].arr[isFoundInIndex].element_out;
        const replacedObj = playersOut[pickIndex - 1].arr.find(
          (x) => x.element === replacedElement
        );

        let isCaptain =
          picks[pickIndex - 1].newPicks[isFoundInPicksIndex].is_captain;
        let isViceCaptain =
          picks[pickIndex - 1].newPicks[isFoundInPicksIndex].is_vice_captain;
        let multiplier =
          picks[pickIndex - 1].newPicks[isFoundInPicksIndex].multiplier;
        let position =
          picks[pickIndex - 1].newPicks[isFoundInPicksIndex].position;
        const replacedElementObj = {
          ...replacedObj,
          is_captain: isCaptain,
          is_vice_captain: isViceCaptain,
          multiplier: multiplier,
          position: position,
        };

        setPlayersIn((x) => [
          ...x.map((gw, idx) =>
            idx === pickIndex - 1
              ? { ...gw, arr: gw.arr.filter((y, key) => key !== isFoundInIndex) }
              : gw
          ),
        ]);
        setPlayersIn((prev) =>
          prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
        );
        setPlayersOut((prev) =>
          prev.map((gw, idx) => (idx > pickIndex - 1 ? { ...gw, arr: [] } : gw))
        );
        setPicks([
          ...picks.map((pick, key) =>
            key === pickIndex - 1
              ? {
                ...pick,
                newPicks: pick.newPicks.map((newPick, idx) =>
                  idx === isFoundInPicksIndex ? replacedElementObj : newPick
                ),
              }
              : pick
          ),
        ]);

        if (chips.freehit.event === +eventId + pickIndex) {
          if (pickIndex === 1) {
            setPicks((prev) =>
              prev.map((pick, key) =>
                key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
              )
            );
          } else {
            setPicks((prev) =>
              prev.map((pick, key) =>
                key > pickIndex - 1
                  ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
                  : pick
              )
            );
          }
        } else {
          setPicks((prev) =>
            prev.map((pick, key) =>
              key > pickIndex - 1
                ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
                : pick
            )
          );
        }

        //In PlayersOut Array
        let isFoundOutIndex = playersOut.findIndex(
          (x) => x.element === player.element
        );
        setPlayersOut((x) => [
          ...x.map((gw, idx) =>
            idx === pickIndex - 1
              ? { ...gw, arr: gw.arr.filter((y, key) => key !== isFoundOutIndex) }
              : gw
          ),
        ]);
        setTempPlayersOut((x) => [...x, replacedElementObj]);
      }
    }

  };

  const changeCaptain = (id) => {
    const old = picks[pickIndex - 1].newPicks.find((x) => x.is_captain);
    const player = picks[pickIndex - 1].newPicks.find((x) => x.element === id);
    let oldCap = false;
    let oldMultiplier = 1;
    let oldVc = player.is_vice_captain === true ? true : false;
    let playerCap = true;
    let playerMultiplier = 2;
    let playerVc = false;
    setPicks(
      picks.map((pick, key) =>
        key === pickIndex - 1
          ? {
            ...pick,
            newPicks: pick.newPicks.map((newPick) =>
              newPick.element === old.element
                ? {
                  ...newPick,
                  is_captain: oldCap,
                  is_vice_captain: oldVc,
                  multiplier: oldMultiplier,
                }
                : newPick.element === player.element
                  ? {
                    ...newPick,
                    is_captain: playerCap,
                    is_vice_captain: playerVc,
                    multiplier: playerMultiplier,
                  }
                  : newPick
            ),
          }
          : pick
      )
    );

    // set picks for later weeks
    if (chips.freehit.event === +eventId + pickIndex) {
      if (pickIndex === 1) {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      } else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
              : pick
          )
        );
      }
    } else {
      setPicks((prev) =>
        prev.map((pick, key) =>
          key > pickIndex - 1
            ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
            : pick
        )
      );
    }
  };
  const changeViceCaptain = (id) => {
    const old = picks[pickIndex - 1].newPicks.find((x) => x.is_vice_captain);
    const player = picks[pickIndex - 1].newPicks.find((x) => x.element === id);
    let oldVc = false;
    let oldMultiplier = player.multiplier >= 2 ? 2 : 1;
    let oldCap = player.is_captain === true ? true : false;
    let playerCap = false;
    let playerVc = true;
    setPicks([
      ...picks.map((pick, key) =>
        key === pickIndex - 1
          ? {
            ...pick,
            newPicks: pick.newPicks.map((newPick) =>
              newPick.element === old.element
                ? {
                  ...newPick,
                  is_captain: oldCap,
                  is_vice_captain: oldVc,
                  multiplier: oldMultiplier,
                }
                : newPick.element === player.element
                  ? {
                    ...newPick,
                    is_captain: playerCap,
                    is_vice_captain: playerVc,
                    multiplier: 1,
                  }
                  : newPick
            ),
          }
          : pick
      ),
    ]);
    // set picks for later weeks
    if (chips.freehit.event === +eventId + pickIndex) {
      if (pickIndex === 1) {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      } else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
              : pick
          )
        );
      }
    } else {
      setPicks((prev) =>
        prev.map((pick, key) =>
          key > pickIndex - 1
            ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
            : pick
        )
      );
    }
  };

  const getOutPlayer = (outplayer) => {
    setOutPlayer(outplayer);
  };
  const getInPlayerOne = (inplayerOne) => {
    setInPlayerOne(inplayerOne);
  };
  const getInPlayerTwo = (inplayerTwo) => {
    setInPlayerTwo(inplayerTwo);
  };
  const switchPlayers = () => {
    setPicks([
      ...picks.map((pick, key) =>
        key === pickIndex - 1
          ? {
            ...pick,
            newPicks: pick.newPicks.map((newPick) =>
              newPick.element === outplayer.element
                ? {
                  ...newPick,
                  is_captain: false,
                  is_vice_captain: false,
                  multiplier: 0,
                  position: inplayerOne.position,
                }
                : newPick.element === inplayerOne.element
                  ? {
                    ...newPick,
                    is_captain: outplayer.is_captain,
                    is_vice_captain: outplayer.is_vice_captain,
                    multiplier: outplayer.multiplier,
                    position: outplayer.position,
                  }
                  : newPick
            ),
          }
          : pick
      ),
    ]);

    // set picks for later weeks
    if (chips.freehit.event === +eventId + pickIndex) {
      if (pickIndex === 1) {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      } else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
              : pick
          )
        );
      }
    } else {
      setPicks((prev) =>
        prev.map((pick, key) =>
          key > pickIndex - 1
            ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
            : pick
        )
      );
    }

    setOutPlayer({});
    setInPlayerOne({});
  };
  const changeBenchOrder = () => {
    setPicks([
      ...picks.map((pick, key) =>
        key === pickIndex - 1
          ? {
            ...pick,
            newPicks: pick.newPicks.map((newPick) =>
              newPick.element === inplayerOne.element
                ? { ...newPick, position: inplayerTwo.position }
                : newPick.element === inplayerTwo.element
                  ? { ...newPick, position: inplayerOne.position }
                  : newPick
            ),
          }
          : pick
      ),
    ]);

    // set picks for later weeks
    if (chips.freehit.event === +eventId + pickIndex) {
      if (pickIndex === 1) {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1 ? { ...pick, newPicks: real } : pick
          )
        );
      } else {
        setPicks((prev) =>
          prev.map((pick, key) =>
            key > pickIndex - 1
              ? { ...pick, newPicks: prev[pickIndex - 2].newPicks }
              : pick
          )
        );
      }
    } else {
      setPicks((prev) =>
        prev.map((pick, key) =>
          key > pickIndex - 1
            ? { ...pick, newPicks: prev[pickIndex - 1].newPicks }
            : pick
        )
      );
    }
    setInPlayerOne({});
    setInPlayerTwo({});
  };
  const cancelPlayer = (player) => {
    player.multiplier === 0 ? setInPlayerOne({}) : setOutPlayer({});
  };
  const getInTheBank = () => {
    
    if (picks.length > 0) {
      const totalBudget = +(picks[pickIndex - 1]?.budget)
      let spent =
        picks[pickIndex - 1]?.newPicks?.reduce((x, y) => x + +y.selling_price, 0) -
        tempPlayersOut?.reduce((x, y) => x + +y.selling_price, 0);
     let inBank = totalBudget - (+(spent))
      return inBank.toFixed(1);
    }
 
  };

  const playersSelected = () => {
    if (picks.length) {
      let firstXV =
        picks[pickIndex - 1].newPicks.length - tempPlayersOut.length;
      return firstXV;
    }
  };

  const goalkeepersSelected = () => {
    if (picks.length) {
      let goalies =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 1)
          .length - tempPlayersOut.filter((x) => x.element_type === 1).length;
      return goalies;
    }
  };
  const defendersSelected = () => {
    if (picks.length) {
      let defenders =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 2)
          .length - tempPlayersOut.filter((x) => x.element_type === 2).length;
      return defenders;
    }
  };
  const midfieldersSelected = () => {
    if (picks.length) {
      let mids =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 3)
          .length - tempPlayersOut.filter((x) => x.element_type === 3).length;
      return mids;
    }
  };
  const forwardsSelected = () => {
    if (picks.length) {
      let forwards =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 4)
          .length - tempPlayersOut.filter((x) => x.element_type === 4).length;
      return forwards;
    }
  };

  const managersSelected = () => {
    if (picks.length) {
      let managers =
        picks[pickIndex - 1].newPicks.filter((x) => x.element_type === 5)
          .length - tempPlayersOut.filter((x) => x.element_type === 5).length;
      return managers;
    }
  };

  const addedPlayer = (team, player) => {
    let playerName = players?.find((x) => x.id === player)?.web_name;
    setPlayerName(playerName);
  };
  const freeTransfers = () => {
    let fts = transferLogic.fts;
    const cPlayersOut = [...playersOut];
    const current = cPlayersOut.splice(0, pickIndex);
    if (eventId === 0 && pickIndex === 2) {
      return (fts = 1);
    }
    if (pickIndex === 1) {
      fts = transferLogic.fts;
    } else {
      returnFt(0, current.length - 1, fts);
    }
    function returnFt(a, b, c) {
      if (a === b) {
        fts = c;
        return;
      }
      if (
        current[a].arr.length === 0 && c < 5 &&
        chips.freehit.event !== current[a].event &&
        chips.wildcard.event !== current[a].event
      ) {
        c += 1;
      }
      if (
        current[a].arr.length >= 0 &&
        (chips.freehit.event === current[a].event ||
          chips.wildcard.event === current[a].event) || c === 5
      ) {
        c += 0;
      }
      if (current[a].arr.length > 0 &&
        chips.freehit.event !== current[a].event &&
        chips.wildcard.event !== current[a].event) {
        if (current[a].arr.length >= c) {
          c = 1;
        } else {
          c -= current[a].arr.length;
          c += 1
        }

      }
      a += 1;
      returnFt(a, b, c);
    }
    return fts;
  };

  const transferCost = () => {
    let fts =
      chips.freehit.event === +eventId + pickIndex ||
        chips.wildcard.event === +eventId + pickIndex || +eventId === 0
        ? 1e10000
        : freeTransfers();
    let playerLength =
      playersOut[pickIndex - 1]?.arr.length === undefined
        ? 0
        : playersOut[pickIndex - 1]?.arr.length;
    let cost = playerLength <= fts ? 0 : (fts - playerLength) * 4;
console.log(`Cost: ${cost}`)
    return cost;
  };

  const colorOfArrow = () => {
    if (managerHistory.current?.length >= 2) {
      const gwCurrent = managerHistory.current.at(-1).overall_rank;
      const gwPrevious = managerHistory.current.at(-2).overall_rank;

      if (gwCurrent < gwPrevious) return "green";
      if (gwCurrent > gwPrevious) return "red";
      return "grey";
    }

    return "grey"; // Default or fallback
  };

  const contextValue = {
    players: players,
    managerId: managerId,
    managerInfo: managerInfo,
    eventId: eventId,
    chips: chips,
    picks: picks,
    real: real,
    playersOut: playersOut,
    playersIn: playersIn,
    tempPlayersOut: tempPlayersOut,
    outplayer: outplayer,
    inplayerOne: inplayerOne,
    inplayerTwo: inplayerTwo,
    transferLogic: transferLogic,
    managerHistory: managerHistory,
    managerPicks: managerPicks,
    transferHistory: transferHistory,
    remainingBudget: remainingBudget,
    pickIndex: pickIndex,
    playerName: playerName,
    initialChips: initialChips,
    nowEvent: nowEvent,
    updateNowEvent,
    updateInitsWc,
    updateInitsTc,
    updateInitsFh,
    updateInitsBb,
    updateInitsAm,
    getManagerInfo,
    updateAm,
    updateWildcard,
    addToTransfersIn,
    addToTransfersOut,
    getPickIndex,
    changeCaptain,
    changeViceCaptain,
    getInPlayerOne,
    getInPlayerTwo,
    getOutPlayer,
    cancelPlayer,
    getInTheBank,
    switchPlayers,
    changeBenchOrder,
    playersSelected,
    goalkeepersSelected,
    defendersSelected,
    midfieldersSelected,
    forwardsSelected,
    managersSelected,
    addedPlayer,
    transferCost,
    freeTransfers,
    updateFreehit,
    updateBboost,
    updateTcap,
    actDeact,
    colorOfArrow,
    resetGws,
  };

  return (
    <ManagerContext.Provider value={contextValue}>
      {children}
    </ManagerContext.Provider>
  );
}

export default ManagerProvider;

export const useManager = () => {
  return useContext(ManagerContext);
};
