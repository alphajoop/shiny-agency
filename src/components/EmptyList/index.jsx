import styled from 'styled-components';
import colors from '../../utils/style/colors';
import EmptyIllustration from '../../assets/empty.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 20px;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};

  @media (min-width: 768px) {
    max-width: 600px;
    margin: 60px auto;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  text-align: center;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: normal;
  text-align: center;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Illustration = styled.img`
  margin: 30px 0;
  width: 80%;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

function EmptyList({ theme }) {
  return (
    <Container theme={theme}>
      <Title theme={theme}>Dommage...</Title>
      <Illustration src={EmptyIllustration} />
      <SubTitle theme={theme}>
        Il semblerait que vous n’ayez besoin d’aucune compétence
      </SubTitle>
    </Container>
  );
}

export default EmptyList;
