import {useMemo, useState} from 'react';
import {USAMap, StateAbbreviations, StateNames} from '@mirawision/usa-map-react';
import $ from 'jquery';

$('.usa-state').hover(function(e){
  console.log(e.target);
});

export default function App_old() {
  const colors = ['#b3b3b3', '#3b4cc0', '#b40426', '#ced2ef', '#ecc0c9'];

  const [statePreferences, setStatePreferences] = useState({
    AL: 2,
    AK: 4, 
    AZ: 0, 
    AR: 2, 
    CA: 1, 
    CO: 1, 
    CT: 1, 
    DC: 1,
    DE: 1, 
    FL: 4, 
    GA: 0, 
    HI: 1, 
    ID: 2, 
    IL: 1, 
    IN: 2, 
    IA: 4, 
    KS: 2, 
    KY: 2, 
    LA: 2, 
    ME: 3, 
    MD: 1, 
    MA: 1, 
    MI: 0, 
    MN: 3,
    MS: 2, 
    MO: 2, 
    MT: 2, 
    NE: 2, 
    NV: 4, 
    NH: 3, 
    NJ: 1, 
    NM: 3, 
    NY: 1, 
    NC: 0, 
    ND: 4, 
    OH: 4, 
    OK: 2, 
    OR: 1, 
    PA: 0, 
    RI: 1, 
    SC: 2, 
    SD: 2, 
    TN: 2, 
    TX: 4, 
    UT: 2, 
    VT: 1, 
    VA: 3, 
    WA: 1, 
    WV: 2, 
    WI: 0, 
    WY: 2
  });

  const electors = {
    AL: 9,
    AK: 3, 
    AZ: 11, 
    AR: 6, 
    CA: 54, 
    CO: 10, 
    CT: 7, 
    DC: 3,
    DE: 3, 
    FL: 30, 
    GA: 16, 
    HI: 4, 
    ID: 4, 
    IL: 19, 
    IN: 11, 
    IA: 6, 
    KS: 6, 
    KY: 8, 
    LA: 8, 
    ME: 4, 
    MD: 10, 
    MA: 11, 
    MI: 15, 
    MN: 10,
    MS: 6, 
    MO: 10, 
    MT: 4, 
    NE: 5, 
    NV: 6, 
    NH: 4, 
    NJ: 14, 
    NM: 5, 
    NY: 28, 
    NC: 16, 
    ND: 3, 
    OH: 17, 
    OK: 7, 
    OR: 8, 
    PA: 19, 
    RI: 4, 
    SC: 9, 
    SD: 3, 
    TN: 11, 
    TX: 40, 
    UT: 6, 
    VT: 3, 
    VA: 13, 
    WA: 12, 
    WV: 4, 
    WI: 10, 
    WY: 3
  };

  const [selectedStates, setSelectedStates] = useState([]);

  const mapSettings = useMemo(() => {
    const settings: MapSettings = {};

    StateAbbreviations.forEach((state) => {
      settings[state] = {
        fill: colors[statePreferences[state]],
        stroke: '#6f8fa5',
        onClick: () => handleClick(state),
        onMouseEnter: () => test(state)
      };
    });

    return settings;
  }, [statePreferences]);

  const test = (state) => {
    console.log('test');
  };

  const handleClick = (state) => {
    switchPreference(state);
  };

  const switchPreference = (state) => {
    const currentPreference = statePreferences[state];
    const newPreference = currentPreference === 4 ? 0 : currentPreference + 1;
    setStatePreferences({...statePreferences, [state]: newPreference});
  };

  return (
    <div>
      <USAMap
        customStates={mapSettings}
      />
    </div>
  );
}
