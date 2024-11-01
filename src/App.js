import {useMemo, useState} from 'react';
import {USAMap, StateAbbreviations} from '@mirawision/usa-map-react';
import $ from 'jquery';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function App() {
  const colors = ['#b3b3b3', '#3b4cc0', '#b40426', '#ced2ef', '#ecc0c9'];
  
  const pollPreferences = {
    AL: 4,
    AK: 4, 
    AZ: 0, 
    AR: 4, 
    CA: 3, 
    CO: 3, 
    CT: 3, 
    DC: 3,
    DE: 3, 
    FL: 4, 
    GA: 0, 
    HI: 3, 
    ID: 4, 
    IL: 3, 
    IN: 4, 
    IA: 4, 
    KS: 4, 
    KY: 4, 
    LA: 4, 
    ME: 3, 
    MD: 3, 
    MA: 3, 
    MI: 0, 
    MN: 3,
    MS: 4, 
    MO: 4, 
    MT: 4, 
    NE: 4, 
    NV: 4, 
    NH: 3, 
    NJ: 3, 
    NM: 3, 
    NY: 3, 
    NC: 0, 
    ND: 4, 
    OH: 4, 
    OK: 4, 
    OR: 3, 
    PA: 0, 
    RI: 3, 
    SC: 4, 
    SD: 4, 
    TN: 4, 
    TX: 4, 
    UT: 4, 
    VT: 3, 
    VA: 3, 
    WA: 3, 
    WV: 4, 
    WI: 0, 
    WY: 4
  };

  // const initialPreferences = {
  //   AL: 4,
  //   AK: 4, 
  //   AZ: 0, 
  //   AR: 4, 
  //   CA: 3, 
  //   CO: 3, 
  //   CT: 3, 
  //   DC: 3,
  //   DE: 3, 
  //   FL: 4, 
  //   GA: 0, 
  //   HI: 3, 
  //   ID: 4, 
  //   IL: 3, 
  //   IN: 4, 
  //   IA: 4, 
  //   KS: 4, 
  //   KY: 4, 
  //   LA: 4, 
  //   ME: 3, 
  //   MD: 3, 
  //   MA: 3, 
  //   MI: 0, 
  //   MN: 3,
  //   MS: 4, 
  //   MO: 4, 
  //   MT: 4, 
  //   NE: 4, 
  //   NV: 4, 
  //   NH: 3, 
  //   NJ: 3, 
  //   NM: 3, 
  //   NY: 3, 
  //   NC: 0, 
  //   ND: 4, 
  //   OH: 4, 
  //   OK: 4, 
  //   OR: 3, 
  //   PA: 0, 
  //   RI: 3, 
  //   SC: 4, 
  //   SD: 4, 
  //   TN: 4, 
  //   TX: 4, 
  //   UT: 4, 
  //   VT: 3, 
  //   VA: 3, 
  //   WA: 3, 
  //   WV: 4, 
  //   WI: 0, 
  //   WY: 4
  // };

  const initialPreferences = {...process.env.REACT_APP_NOT_SECRET_CODE};

  const stateNames = {
    AL: 'Alabama',
    AK: 'Alaska', 
    AZ: 'Arizona', 
    AR: 'Arkansas', 
    CA: 'Californië',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };

  const [modalShow, setModalShow] = useState(false);
  const [presidentName, setPresidentName] = useState(null);
  const [history, setHistory] = useState([initialPreferences]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const statePreferences = history[currentPosition];
  // const [statePreferences, setStatePreferences] = useState(initialPreferences);

  const [hoveredInfo, setHoveredInfo] = useState('US Elections 2024');
  
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

  const checkDisabled = (buttonType) => {
    if ((buttonType === 'reset' || buttonType === 'undo') && currentPosition === 0)
    {
      return true;
    }
    if (buttonType === 'redo' && currentPosition === (history.length - 1))
    {
      return true;
    }
    return false;
  };

  const checkPresident = (state, newPreference) => {
    if (newPreference === 1 && (getPartyElectors(1) + electors[state]) >= 270)
    {
      setPresidentName('Kamala D. Harris');
      setModalShow(true);
    }
    else if (newPreference === 2 && (getPartyElectors(2) + electors[state]) >= 270)
    {
      setPresidentName('Donald J. Trump');
      setModalShow(true);
    }
    else {
      setPresidentName(null);
      setModalShow(false);
    }
  };

  const getKeyRaceAlerts = () => {
    const alerts = [];

    for (const [key, value] of Object.entries(statePreferences)) {
      if (value === 1 && pollPreferences[key] === 0)
      {
        alerts.push(['blue', 'Swing State ' + stateNames[key] + ' met ' + electors[key] + ' kiesmannen naar de Democraten!']);
      }
      if (value === 1 && pollPreferences[key] === 4)
      {
        alerts.push(['blue', 'Republikeinse staat ' + stateNames[key] + ' met ' + electors[key] + ' kiesmannen naar de Democraten!']);
      }
      if (value === 2 && pollPreferences[key] === 0)
      {
        alerts.push(['red', 'Swing State ' + stateNames[key] + ' met ' + electors[key] + ' kiesmannen naar de Republikeinen!']);
      }
      if (value === 2 && pollPreferences[key] === 3)
      {
        alerts.push(['red', 'Democratische staat ' + stateNames[key] + ' met ' + electors[key] + ' kiesmannen naar de Republikeinen!']);
      }
    }

    return (
      <>{
      alerts.map((entry, index) => (
        <Alert key={index} variant={(entry[0] === 'blue' ? 'primary' : 'danger')}>{entry[1]}</Alert>
      ))
      }</>
    );
  };

  const getPartyElectors = (pref) => {
    let num = 0;

    for (const [key, value] of Object.entries(statePreferences)) {
      if (value === pref)
      {
        num += electors[key];
      }
    }

    return num;
  };

  const getPartyPercentage = (pref) => {
    let total = 0;
    let party = 0;

    for (const [key, value] of Object.entries(statePreferences)) {
      total += electors[key];

      if (value === pref)
      {
        party += electors[key];
      }
    }

    return (party / total * 100);
  };

  const getStateList = (pref = 'all') => {
    const liClasses = ['swing', 'certDem', 'certRep', 'probDem', 'probRep'];

    return(
      <ul className="stateList">
        {
          Object.keys(stateNames).map((abbr, index) => {
            if (pref === 'swing' && statePreferences[abbr] !== 0)
            {

            }
            else if (pref === 'dem' && (statePreferences[abbr] !== 1 && statePreferences[abbr] !== 3))
            {

            }
            else if (pref === 'rep' && (statePreferences[abbr] !== 2 && statePreferences[abbr] !== 4))
            {
              
            }
            else
            {
              return (<li 
                onClick={() => handleClick(abbr)}
                onMouseOver={() => showStateInfo(abbr)}
                key={abbr} 
                className={liClasses[statePreferences[abbr]]}
                >{stateNames[abbr] + ' (' + electors[abbr] + ')'}</li>);
            }
          })
        }
      </ul>
    );
  };

  const handleClick = (state) => {
    switchPreference(state);
  };

  const handleMouseOver = (e) => {
    if ($(e.target).hasClass('usa-state')) {
      showStateInfo(e.target.dataset.name);
    }
    else {
      setHoveredInfo('US Elections 2024');
    }
  };

  const redo = () => {
    if (currentPosition < (history.length - 1))
    {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const resetStates = () => {
    setHistory([initialPreferences]);
    setCurrentPosition(0);
    // setStatePreferences(initialPreferences);
  };

  const showStateInfo = (state) => {
    const numElectors = electors[state];
    const preference = initialPreferences[state];
    const fullName = stateNames[state];
    let preferenceText;

    if (preference === 0) {
      preferenceText = 'Swing State';
    }
    else if (preference === 3)
    {
      preferenceText = 'Democraten';
    }
    else if (preference === 4)
    {
      preferenceText = 'Republikeinen';
    }

    const theText = fullName + ' - ' + numElectors + ' kiesmannen - ' + preferenceText;

    setHoveredInfo(theText);
  };

  const switchPreference = (state) => {
    if (initialPreferences[state] != 1 && initialPreferences[state] != 2)
    {
      const currentPreference = statePreferences[state];
      const pollPreference = pollPreferences[state];
      let newPreference;

      if (pollPreference === 0)
      {
        if (currentPreference === 0)
        {
          newPreference = 1;
        }
        else if (currentPreference === 1)
        {
          newPreference = 2;
        }
        else { // currentPreference === 2
          newPreference = 0;
        }
      }
      else if (pollPreference === 3)
      {
        if (currentPreference === 3)
        {
          newPreference = 1;
        }
        else if (currentPreference === 1)
        {
          newPreference = 2;
        }
        else { // currentPreference === 2
          newPreference = 3;
        }
      }
      else // pollPreference === 4
      {
        if (currentPreference === 4)
        {
          newPreference = 2;
        }
        else if (currentPreference === 2)
        {
          newPreference = 1;
        }
        else { // currentPreference === 1
          newPreference = 4;
        }
      }

      // const currentPreferences = history[currentPosition].slice();
      const newPreferences = {...history[currentPosition], [state]: newPreference};
      const nextHistory = [...history.slice(0, currentPosition + 1), newPreferences];
      setHistory(nextHistory);
      setCurrentPosition(nextHistory.length - 1);
      checkPresident(state, newPreference);
      // setStatePreferences({...statePreferences, [state]: newPreference});
    }
  };

  const undo = () => {
    if (currentPosition > 0)
    {
      setCurrentPosition(currentPosition - 1);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} lg={8}>
            <Row>
              <Col>
                <h3>{hoveredInfo}</h3>
              </Col>
            </Row>
            <Row>
              <Col onMouseOver={handleMouseOver}>
                <USAMap customStates={mapSettings} />
              </Col>
            </Row>
            <Row className="progress-section">
              <Col onMouseOver={handleMouseOver}>
                <ProgressBar>
                  <ProgressBar variant="success" now={getPartyPercentage(1)} key={1} label={getPartyElectors(1)} />
                  <ProgressBar variant="warning" now={getPartyPercentage(3)} key={2} label={getPartyElectors(3)} />
                  <ProgressBar variant="info" now={getPartyPercentage(0)} key={3} label={getPartyElectors(0)} />
                  <ProgressBar variant="danger" now={getPartyPercentage(4)} key={4} label={getPartyElectors(4)} />
                  <ProgressBar variant="primary" now={getPartyPercentage(2)} key={5} label={getPartyElectors(2)} />
                </ProgressBar>
              </Col>
            </Row>
            <Row>
              <Col className="col-sum-dem">
               <p>{getPartyElectors(1) + getPartyElectors(3)}</p>
              </Col>
              <Col className="col-sum-rep">
               <p>{getPartyElectors(2) + getPartyElectors(4)}</p>
              </Col>
            </Row>
            <Row className="button-section">
              <Col lg={6}>
                <ButtonGroup >
                  <Button variant="outline-danger" onClick={resetStates} disabled={checkDisabled('reset')}>Reset</Button>
                  <Button variant="outline-warning" onClick={undo} disabled={checkDisabled('undo')}>Undo</Button>
                  <Button variant="outline-success" onClick={redo} disabled={checkDisabled('redo')}>Redo</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={4}>
            <Tabs
              defaultActiveKey="kra"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="kra" title="Key Race Alerts">
                {getKeyRaceAlerts()}
              </Tab>
              <Tab eventKey="statesOverview" title="Staten">
                <Row>
                  <Col lg={12}>
                    {getStateList('swing')}
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col sm={6} lg={6}>
                    {getStateList('dem')}
                  </Col>
                  <Col sm={6} lg={6}>
                    {getStateList('rep')}
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        presidentName={presidentName}
      />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"  className="text-center">
          NEW PRESIDENT ELECT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h1>{props.presidentName}</h1>
      </Modal.Body>
    </Modal>
  );
}