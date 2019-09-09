import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }

  p {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    margin-top: 20px;
    color: #e52993;
  }
`;

export default Container;
