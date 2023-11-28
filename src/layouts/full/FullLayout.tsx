//its for after login form 
import * as React from 'react';
import Sidebar from './Sidebar';


interface IFullLayoutProps {
}

//generic syntax
const FullLayout: React.FunctionComponent<IFullLayoutProps> = (props) => {
  return (<>
  <h3>Full Layout</h3>
  <Sidebar/>
  </>
  );
};

export default FullLayout;
