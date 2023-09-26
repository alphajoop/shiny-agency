import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Atoms';

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;

function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;
  const [surveyData, setSurveyData] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);

  //useEffect(() => {
  // fetchData()
  //  setDataLoading(true);
  //  fetch(`https://api-shiny-agency.vercel.app/survey`).then((response) =>
  //    response.json().then(({ surveyData }) => {
  //      setSurveyData(surveyData);
  //      setDataLoading(false);
  //    }),
  //  );
  // }, []);

  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      try {
        const response = await fetch(
          `https://api-shiny-agency.vercel.app/survey`,
        );
        const { surveyData } = await response.json();
        setSurveyData(surveyData);
      } catch (error) {
        console.log('===== error =====', error);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
