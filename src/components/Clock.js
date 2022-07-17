import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Clock = () => {
  const [time, setTime] = useState(``);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toISOString().slice(0, 19))
    }, 900)
  }, [])

  return (
    <Screen>
      <h2>{ time }</h2>
    </Screen>
  );
}

const Screen = styled.div`
  color: wheat;
  padding: 20px;
  text-align: center;
`;

export default Clock;
