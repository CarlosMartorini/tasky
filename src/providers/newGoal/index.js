import { createContext, useState, useEffect } from "react";
import { api }                                from '../../service/api';

export const NewGoalContext = createContext();

export const NewGoalProvider = ({ children }) => {

  const userToken = JSON.parse( localStorage.getItem('@tasky/login/token') );

  const [newGoalData, setNewGoalData] = useState();

  const newGoalRequest = () => {

    newGoalData['group'] = 442;
    
    api.post('goals/', newGoalData, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        },
      })
      .then( response => response.status === 201 && window.location.reload() )
  };

  useEffect(() => {
    if (newGoalData) newGoalRequest();
  }, [newGoalData]);

  return (
    <NewGoalContext.Provider value={{setNewGoalData}}> 
      {children}
    </NewGoalContext.Provider>
  );
};