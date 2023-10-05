import { useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Atoms';
import { SurveyContext } from '../../utils/context';
import { useFetch, useTheme } from '../../utils/hooks';

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Ajustez le padding */

  @media (min-width: 768px) {
    padding: 40px; /* Ajustez le padding pour les écrans plus larges */
  }
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const LinkWrapper = styled.div`
  padding-top: 30px;

  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
    margin-right: 12px;
  }

  & a:last-child {
    margin-right: 0;
  }

  @media (min-width: 768px) {
    display: flex; /* Afficher en ligne sur les écrans plus larges */

    & a:first-of-type {
      margin-right: 20px;
    }
  }
`;

const ReplyBox = styled.button`
  border: none;
  height: 50px; /* Ajuster la hauteur */
  width: 200px;
  margin-bottom: 10px;
  padding: 0 20px; /* Ajouter un peu de rembourrage */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 15px; /* Arrondir les coins */
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};

  @media (min-width: 768px) {
    margin-bottom: 0; /* Réinitialiser la marge pour les écrans plus larges */
    width: auto; /* Ajuster la largeur automatiquement sur les écrans plus larges */
  }
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Par défaut : affichage en colonne */

  @media (min-width: 768px) {
    flex-direction: row; /* Sur les écrans plus larges, affichage en ligne */

    /* Ajouter une marge au deuxième ReplyBox */
    & > :first-child {
      margin-right: 15px;
    }

    /* Ajouter une marge au premier ReplyBox */
    & > :last-child {
      margin-left: 15px;
    }
  }
`;

function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;
  const { theme } = useTheme();

  const { saveAnswers, answers } = useContext(SurveyContext);
  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer });
  }

  const { data, isLoading, error } = useFetch(
    `https://api-shiny-agency.vercel.app/survey`,
  );
  const { surveyData } = data;

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData[questionNumber]}
        </QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          $isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          $isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
