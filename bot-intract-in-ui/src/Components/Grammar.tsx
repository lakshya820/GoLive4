import * as io from "socket.io-client";
import { default as React, useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import '../css/Grammar.css';

interface GrammarCorrectionResult {
  questions: string[]
  grammarArray: string[]
  correctedGrammarArray: string[]
  total: number
}

const Grammar: React.FC = () => {
  const [grammarCorrectionResult, setGrammarCorrectionResult] = useState<GrammarCorrectionResult | null>(null);
  const [sentimentResult, setSentimentResult] = useState(null);

  const navigate = useNavigate();

    const socket = io.connect("https://golive4-server.onrender.com");

  
    useEffect(() => {
      socket.on("grammarCorrectionResult", (data: GrammarCorrectionResult) => {
        setGrammarCorrectionResult(data);
        //console.log('grammaresult:', data);
      });
  
      socket.on("lexsentimenttofrontend", (data) => {
        setSentimentResult(data);
        console.log('sentimenTresult:', sentimentResult);
      });
  
  
      
    //    return () => {
    //     socket.off("grammarCorrectionResult"); 
    //     socket.off("lexsentimenttofrontend");// Clean up the event listener
    //     socket.disconnect(); // Disconnect socket when component unmounts
    // };
  }, []);

    const handleSubmittoDashboard= () => {
      navigate('/main/dashboard');
    };

    return (
        <React.Fragment>
            <div className="grammar">
              <Header></Header>
              {grammarCorrectionResult && (
                <div className="grammar_content">
                  <table className="grammar_table">
                    <thead>
                      <tr>
                        <th>Questions</th>
                        <th>Original Statements</th>
                        <th>Corrected Statements</th>
                      </tr>
                    </thead>
                    <tbody>
                    {grammarCorrectionResult.questions.map((question, index) => (
                  <tr key={index}>
                    <td>{question}</td>
                    <td>{grammarCorrectionResult.grammarArray[index]}</td>
                    <td>{grammarCorrectionResult.correctedGrammarArray[index]}</td>
                  </tr>
                ))}
                    </tbody>
                  </table>
                  <p>Total Correct Percentage: {grammarCorrectionResult.total.toFixed(2)}%</p>
                  <p>Total Correct Percentage: {sentimentResult.toFixed(2)}</p>
                  <button className="grammar_next_button" onClick={handleSubmittoDashboard}>HOME</button>
                </div>
              )}
          </div>
        </React.Fragment>
    );
}

export default Grammar;