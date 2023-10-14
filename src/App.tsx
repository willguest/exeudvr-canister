import { Fragment } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { AppWindowInternal, useUnity } from './components/UnityInterface';

function App () {
	const appWindow = useUnity();
    return (
		<Fragment>
			{!appWindow.isLoaded && 
			<LoadingScreen progression={appWindow.progression}/>}
			<AppWindowInternal unityContext={appWindow.unityContext} />
		</Fragment>
    );
}
export default App;