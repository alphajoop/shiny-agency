import styled from 'styled-components';
import colors from '../../utils/style/colors';
import ErrorPicture from '../../assets/404.svg';
import { useTheme } from '../../utils/hooks';

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  align-items: center;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: 60px auto;
    padding: 30px;
  }
`;

const ErrorTitle = styled.h1`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const ErrorSubtitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
  font-weight: 300;
  text-align: center;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Illustration = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;

  @media (min-width: 768px) {
    max-width: 800px;
  }
`;

function Error() {
  const { theme } = useTheme();

  return (
    <ErrorWrapper theme={theme}>
      <ErrorTitle theme={theme}>Oups...</ErrorTitle>
      <Illustration src={ErrorPicture} />
      <ErrorSubtitle theme={theme}>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </ErrorWrapper>
  );
}

export default Error;
